module.exports = {
    name: "ping",
    usage: ["!ping"],
    description: "Returns pong and args length",
    execute(bot, sender, args) {
        console.log(sender)
        bot.sendMessage(`Pong! @${sender.username}, sua mensagem tem ${args.length} args`)
    }
}