const Jimp = require('jimp');
const Command = require('../../structures/CommandClass');
const { EmbedBuilder, AttachmentBuilder, ApplicationCommandType, ContextMenuCommandBuilder } = require('discord.js');
const { GifFrame, GifUtil, GifCodec } = require('gifwrap');

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
		const imageFolder = process.env.IMAGE_FOLDER;

		const user = client.users.cache.get(interaction.targetId) || interaction.user;
		
		const readGif = await GifUtil.read(imageFolder + "\\brick.gif");
		const promises = readGif.frames.map( async gifFrame => {
			const jimpImage = GifUtil.copyAsJimp(Jimp, gifFrame);

			//get user image here
			const userImg = await Jimp.read(imageFolder + "\\avatar.png");
			jimpImage.composite(userImg, 135, 245)
		  
			GifUtil.quantizeDekker(jimpImage,256);
			return new GifFrame(jimpImage.bitmap, {
			  disposalMethod: gifFrame.disposalMethod, // not documented by gifwrap but it's in the source
			  delayCentisecs: gifFrame.delayCentisecs, 
			});
		});
		const gifFramesWithUser = await Promise.all(promises);

		const codec = new GifCodec();
		codec.encodeGif(gifFramesWithUser).then( async gif => {
				const attachment = new AttachmentBuilder(gif.buffer, { name: 'brick.gif' });
		
				const embed = new EmbedBuilder()
					.setTitle(`** ${interaction.user.username} throws a brick at ${user.username}**`)
					.setColor(client.config.embedColor)
					.setImage('attachment://brick.gif');
			
				await interaction.reply({ embeds: [embed], files: [attachment] });
		});
	};
}