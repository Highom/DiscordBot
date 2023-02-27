const Command = require('../../structures/CommandClass');

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('rpc')
				.setDescription('Play Rock Paper Scissor')
				.setDMPermission(true),
			usage: 'rpc',
			category: 'Game',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links', 'Add Reactions'],
		});
	}
	async run(client, interaction) {
		const now = Date.now();
		await interaction.deferReply();

		const pingEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${client.user.username}'s Rock Paper Scissor Game`,
				iconURL: client.user.displayAvatarURL({ size: 2048 }),
			})
			.setColor('#fee75c')
			.setDescription(stripIndents`
		    **⏱ Roundtrip:** ${Math.round(Date.now() - now)} ms
		    **💓 API:** ${Math.round(client.ws.ping)} ms
		    `);

		return await interaction.followUp({ embeds: [pingEmbed] });

		// TODO Change to using a Embed

		// interaction.channel.send('Singleplayer Round started, react with Rock, Paper or Scissor!').then(sentMessage => {
		// 	sentMessage.react('🥌');
		// 	sentMessage.react('🗞️');
		// 	sentMessage.react('✂️');

		// 	const filter = (reaction, user) => {
		// 		return ['🥌', '🗞️', '✂️'].includes(reaction.emoji.name) && user.id === interaction.author.id;
		// 	};

		// 	sentMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
		// 		.then(collected => {
		// 			const reaction = collected.first();
		// 			const choices = ['🥌', '🗞️', '✂️'];
		// 			const result = choices[Math.floor(Math.random() * 3)];

		// 			if (reaction.emoji.name === result) {
		// 				return interaction.channel.send(`It's a tie! \nWe both picked ${result}`);
		// 			}

		// 			switch (reaction.emoji.name) {
		// 			case '🥌':
		// 				if (result === '🗞️') {
		// 					return interaction.channel.send('I won! \n🗞️ covers 🥌');
		// 				}
		// 				return interaction.channel.send('You won! \n🥌 smashes ✂️');
		// 			case '🗞️':
		// 				if (result === '✂️') {
		// 					return interaction.channel.send('I won! \n✂️ cut 🗞️');
		// 				}
		// 				return interaction.channel.send('You won! \n🗞️ covers 🥌');
		// 			case '✂️':
		// 				if (result === '🥌') {
		// 					return interaction.channel.send('I won! \n🥌 smashes ✂️');
		// 				}
		// 				return interaction.channel.send('You won! \n✂️ cuts 🗞️');
		// 			}
		// 		})
		// 		.catch(() => {
		// 			sentMessage.channel.send('An error occured, please try again.');
		// 		});
		// });
	}
};