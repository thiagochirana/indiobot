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

bot.eventEmitter.on("chatMessage", (e) => {
    commands.forEach(command => {
        command.usage.forEach(async usage => {
            if (e.message.toLowerCase().startsWith(usage)) {
                const userInfo = await bot.getUserInfo(e.username);
                command.execute(bot, userInfo, e.message.split(" "))
            }
        })
    })
})

bot.eventEmitter.on("connected", async () => {
    console.log("Twitch bot connected");
})

bot.eventEmitter.on("closed", () => {
    console.log("Twitch bot disconnected");
})

bot.eventEmitter.on("error", (e) => {
})

bot.eventEmitter.on("unhandled", (e) => {
})

bot.connect()
