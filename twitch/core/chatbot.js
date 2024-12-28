const WebSocket = require("ws")
const EventEmitter = require('node:events');
const parser = require("./parser");
const axios = require("axios");

class Chatbot {
    constructor(username, oauth_token, channel_name, client_id) {
        this.username = username;
        this.oauth_token = oauth_token;
        this.channel_name = channel_name;
        this.client_id = client_id;
        this.eventEmitter = new EventEmitter();
        this.chat = undefined;
        this.twitchWssURL = "wss://irc-ws.chat.twitch.tv:443";
    }

    connect() {
        if (this.chat) {
            new Error("Already connected to Twitch WSS")
        }

        try {
            this.chat = new WebSocket(this.twitchWssURL);

            this.chat.addEventListener("open", (e) => {
                this.chat.send(`PASS oauth:${this.oauth_token}`);
                this.chat.send(`NICK ${this.username}`);
                this.chat.send(`JOIN #${this.channel_name}`);
                this.eventEmitter.emit("connected")
            });

            this.chat.addEventListener("message", (event) => this.onMessage(event));
            this.chat.addEventListener("error", (e) => this.onDisconnect(e));
            this.chat.addEventListener("close", (e) => this.onDisconnect(e));

        } catch (error) {
            this.eventEmitter.emit("closed")
            throw new Error(JSON.stringify(error))
        }
    }

    sendMessage(content) {
        if (!this.chat) throw new Error("Cannot send a message while not connected")

        this.chat.send(`PRIVMSG #${this.channel_name} :${content}`);
    }

    async getUserInfo(username) {
        try {
            const rawData = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, { headers: { "Authorization": `Bearer ${this.oauth_token}`, "Client-ID": `${this.client_id}` } });
            const data = rawData.data.data;

            return data;
        } catch (error) {
            throw new Error("Failed to get user info")
        }
    }

    onMessage(event) {
        if (event.data.includes("PING")) {
            return this.chat.send("PONG");
        }

        if (event.data.includes("Welcome") && !event.data.includes("PRIVMSG")) {
            this.eventEmitter.emit("ready");
        } else if (event.data.includes("PRIVMSG")) {
            this.eventEmitter.emit("message", parser.message(event.data));
        } else {
            this.eventEmitter.emit("unhandled", event.data);
        }
    }

    onDisconnect(e) {
        this.eventEmitter.emit("closed")
        this.chat.close();
        this.chat = undefined;

        throw new Error(JSON.stringify(e))
    }
}

module.exports = Chatbot;