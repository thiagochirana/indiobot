module.exports = {
    name: "ping",
    usage: ["!ping"],
    description: "Returns pong and args length",
    execute(bot, interaction) {
        console.log(interaction)
        bot.sendMessage(`Pong! @${interaction.sender.login}, sua mensagem tem ${interaction.message.args.length} args`)
    }
}