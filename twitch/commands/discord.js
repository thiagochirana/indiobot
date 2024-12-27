module.exports = {
    name: "ping",
    usage: ["!discord"],
    description: "Returns discord url server",
    execute(bot, sender) {
        console.log(sender)
        bot.sendMessage(`${sender.username} -> https://discord.gg/4apwVz7TkQ`)
    }
}