const Chatbot = require("./core/chatbot");
const bot = new Chatbot(process.env.TWITCH_BOT_USERNAME, process.env.TWITCH_BOT_OAUTH, process.env.TWITCH_BOT_CHANNEL)

bot.eventEmitter.on("chatMessage", (e) => {
    console.log(e);
})

bot.connect()
