module.exports = {
    name: "ping",
    usage: ["!ping"],
    description: "Returns pong and args length",
    execute(bot, sender, args) {
        bot.sendMessage(`Pong! ${sender}, sua mensagem tem ${args.length} args`)
    }
}