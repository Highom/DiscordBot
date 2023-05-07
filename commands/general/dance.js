const Command = require('../../structures/CommandClass');

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class Dance extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('dance')
				.setDescription('Makes a funny dance.')
				.setDMPermission(true),
			usage: 'dance',
			category: 'Fun',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const now = Date.now();
		await interaction.deferReply();

		const danceEmbed = new EmbedBuilder()
			.setAuthor({
				name: `Dance for ${interaction.user.username}`,
				iconURL: interaction.user.displayAvatarURL({ size: 2048 }),
			})
			.setColor('#fee75c')
			.setDescription(stripIndents`
			🕺💃🕺💃👯👯‍♂️👯‍♀️🕺💃🕺💃
            `);

		return await interaction.followUp({ embeds: [danceEmbed] });
	}
};