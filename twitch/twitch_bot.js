const Chatbot = require("./core/chatbot");
const path = require("path")
const fs = require("fs")
const bot = new Chatbot(process.env.TWITCH_BOT_USERNAME, process.env.TWITCH_BOT_OAUTH, process.env.TWITCH_BOT_CHANNEL, process.env.TWITCH_BOT_CLIENT_ID)
const commands = [];

const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    if ('execute' in command) {
        commands.push(command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "execute" property.`);
    }
}

bot.eventEmitter.on("message", (e) => {
    commands.forEach(command => {
        command.usage.forEach(async usage => {
            if (e.message.toLowerCase().startsWith(usage)) {
                const userInfo = await bot.getUserInfo(e.username);
                const obj = { sender: userInfo[0], message: { content: e.message, args: e.message.split(" ") } }

                command.execute(bot, obj)
            }
        })
    })
})

bot.eventEmitter.on("connected", async () => {
    console.log("Connected to twitch wss");
})

bot.eventEmitter.on("ready", async () => {
    console.log("Twitch bot authenticated");
})

bot.eventEmitter.on("closed", () => {
    console.log("Twitch bot disconnected");
})

bot.eventEmitter.on("unhandled", (e) => {
})

bot.connect()
