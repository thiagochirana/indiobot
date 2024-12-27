const WebSocket = require("ws")
const EventEmitter = require('node:events');

function parseMessage(message) {
    const regex = /:(\w+)!(\w+)@(\w+)\.tmi\.twitch\.tv PRIVMSG #(\w+) :(.+)/;
    const match = message.match(regex);

    if (!match) {
        return null;
    }

    return {
        username: match[1],
        user_id: match[2],
        domain: match[3],
        channel: match[4],
        message: match[5]
    };
}

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
        this.chat = new WebSocket(this.twitchWssURL);

        this.chat.addEventListener("open", () => {
            this.chat.send(`PASS oauth:${this.oauth_token}`);
            this.chat.send(`NICK ${this.username}`);
            this.chat.send(`JOIN #${this.channel_name}`);
            this.eventEmitter.emit("connected", this.channel_name)
        });

        this.chat.addEventListener("message", (event) => {
            if (event.data.includes("PING")) socket.send("PONG");
            if (event.data.includes("PRIVMSG")) {
                this.eventEmitter.emit("chatMessage", parseMessage(event.data))
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
    }

    sendMessage(content) {
        if (!this.chat) return console.log("Not connected");

        this.chat.send(`PRIVMSG #${this.channel_name} :${content}`);
    }
}

module.exports = Chatbot;