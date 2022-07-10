// requirements
const { Collection, Client, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const { Discord } = require('discord.js');
const colours = require('../../configs/colours.json');

const images = require('../../configs/images.json')
// module

module.exports = {
	name: 'botinfo',
	category: 'info',
	usage: '%botinfo',
	image: 'https://cdn.discordapp.com/attachments/874313480067485696/874313920024829982/unknown.png',
	requirements: ['NONE'],
	description: 'Gives Information Of The Bot',
	run: async (client, message, args) => {
		message.delete();
		const rando = Math.floor(Math.random() * 2)
		console.log(rando)
		let colore = 'blank'
		if (rando == 0) {
			colore = colours.CJ
		}
		if (rando == 1) {
			colore = colours.CHB
		}
		const embed = new MessageEmbed()
			.setColor(colore)
			.setTitle('Pegasus')
			.setDescription('The Pegasus Bot Of CHB')
			.setThumbnail(images.logo)
			.addField('Owner', '<@350954110654087169>')
			.addField('Version', '2.2.4')
			.addField('Language', 'Javascript')
			.setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic:true }))
			.setTimestamp();
		message.author.send({ embeds: [embed] });
	},
};

