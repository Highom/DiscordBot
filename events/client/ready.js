const Event = require('../../structures/EventClass');

const { ActivityType } = require('discord.js');

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true,
		});
	}
	async run() {
		const client = this.client;

		client.user.setActivity('Highom struggle at Coding', { type: ActivityType.Watching });

		// bot counts itself as a user
		console.log(`Discord Bot is now online with ${client.users.cache.size -1} users and ${client.guilds.cache.size} servers.`);
	}
};