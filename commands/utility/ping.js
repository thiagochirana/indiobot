const { SlashCommandBuilder, MessageFlags, Colors } = require('discord.js');
const embed = require('../../messages/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        emb = embed.create("Pong!", "Respondido", Colors.DarkGold, "https://c.tenor.com/3gfpyXD6kM8AAAAd/tenor.gif" )
        await interaction.reply({ embeds: [emb] , flags: MessageFlags.Ephemeral})
	},
};
