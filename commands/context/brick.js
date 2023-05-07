const Command = require('../../structures/CommandClass');

const { EmbedBuilder, ApplicationCommandType, ContextMenuCommandBuilder } = require('discord.js');

module.exports = class Brick extends Command {
	constructor(client) {
		super(client, {
			data: new ContextMenuCommandBuilder()
				.setName('Brick')
				.setType(ApplicationCommandType.User)
				.setDMPermission(false),
			contextDescription: 'Throw a Brick at a User',
			usage: 'Brick',
			category: 'Context',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const user = client.users.cache.get(interaction.targetId) || interaction.user;

		//Do some stuff to the Avatar to Overlay a brick gif!

		const embed = new EmbedBuilder()
			.setTitle(`** ${interaction.user.username} throws a brick at ${user.username}**`)
			.setColor(client.config.embedColor)
			.setImage(user.displayAvatarURL({ size: 2048 }));

		await interaction.reply({ embeds: [embed] });
	}
};