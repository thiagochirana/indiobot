const { SlashCommandBuilder, MessageFlags, AttachmentBuilder, Colors } = require('discord.js');
const embed = require('../../messages/embed');
const attachs = require("../../attach.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        emb = embed.create("Pong!", "Respondido", Colors.DarkGold, attachs.gifs.ping )
        await interaction.reply({ embeds: [emb], flags: MessageFlags.Ephemeral })
	}
};
