const WebSocket = require("ws")
const EventEmitter = require('node:events');
const parser = require("./parser");

class Chatbot {
    constructor(username, oauth_token, channel_name) {
        this.username = username;
        this.oauth_token = oauth_token;
        this.channel_name = channel_name;
        this.eventEmitter = new EventEmitter();
        this.chat = undefined;
        this.twitchWssURL = "wss://irc-ws.chat.twitch.tv:443";
    }

    connect() {
        try {
            if (this.chat) return console.log("Already connected")

            this.chat = new WebSocket(this.twitchWssURL);

            this.chat.addEventListener("open", (e) => {
                this.chat.send(`PASS oauth:${this.oauth_token}`);
                this.chat.send(`NICK ${this.username}`);
                this.chat.send(`JOIN #${this.channel_name}`);
            });

            this.chat.addEventListener("message", (event) => {
                if (event.data.includes("PING")) { return this.chat.send("PONG"); };

                switch (true) {
                    case event.data.includes("Welcome") && !event.data.includes("PRIVMSG"):
                        this.eventEmitter.emit("connected")
                        break;

                    case event.data.includes("PRIVMSG"):
                        this.eventEmitter.emit("chatMessage", parser.message(event.data))
                        break;

                    default:
                        this.eventEmitter.emit("unhandled", event.data)
                        break;
                }
            });

            this.chat.addEventListener("error", (e) => {
                this.eventEmitter.emit("error", JSON.stringify(e))
                this.eventEmitter.emit("closed")

                this.chat.close();
                this.chat = undefined;
            });

            this.chat.addEventListener("close", () => {
                this.eventEmitter.emit("closed")
                this.chat = undefined;
            });
        } catch (error) {
            this.eventEmitter.emit("error", JSON.stringify(error))
            this.eventEmitter.emit("closed")
        }
    }

    sendMessage(content) {
        if (!this.chat) return console.log("Not connected");

        this.chat.send(`PRIVMSG #${this.channel_name} :${content}`);
    }
}

module.exports = Chatbot;