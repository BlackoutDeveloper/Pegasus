// requirements
const { MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const config = require('../../configs/config.json');


// Constants
var prefix = config.prefix;

// module

module.exports = {
	name: 'help',
	category: 'Info',
	usage: '%help',
	image: 'https://images-ext-1.discordapp.net/external/tfonJdT1H0-LDWlrKsgUuYt5FTRts49Amcb16g5nb10/%3Fsize%3D8192/https/media.discordapp.net/attachments/787492478860656660/788184223109873734/unknown.png',
	description: 'Help Command',
	run: async (client, message, args, cmd) => {
		if(!args[0]) {

			message.delete();

			

			const DmEmbed = new MessageEmbed()
				.setAuthor('Help Command!', message.author.displayAvatarURL({ size: 4096, dynamic: true }))
				.setColor(colours.CHB)
				.setThumbnail(message.guild.iconURL({ size: 4096 }))
				.setDescription(`These are the avaliable Commands for the Pegasus Bot!\nThe bot prefix is: %
				
				**Commands:**`)
				.addField('CHB', '``roll`` ``ti`` ``afk`` ``av`` ``profile``')
				.addField('Pegasus', '``help [COMMAND]`` ``botinfo`` ``log``')
				.setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic:true }))
				.setTimestamp();

			
			message.author.send({ embeds: [DmEmbed] }).catch(() => message.channel.send({ embeds: [DmEmbed] }).then(m => { m.delete({ timeout: 10000 });}));

		}

		if(message.content == '%help help') return message.author.send('Just do **%help** instead.');

		if(args[0]) {
			let command = client.commands.get(args[0]);
			if(!command) command = client.commands.get(client.aliases.get(args[0]));
			if(!command) return;
			if(command.category === 'developer') return;

			const CHEmbed = new MessageEmbed()
				.setAuthor('Pegasus Bot Help', client.user.displayAvatarURL({ size:4096, dynamic:true }))
				.setColor(colours.CHB)
				.setThumbnail(command.image || client.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.name}\n**Description: **${command.description || 'No Description'}\n**Usage: **${command.usage || 'No Usage'}\n**Aliases: **${command.aliases || 'No Aliases'}\n**Requirements: **\`\`${command.requirements}\`\``)
				.setFooter(`Requested By ${message.author.tag} | Pegasus`)
				.setTimestamp();
			message.channel.send({ embeds: [CHEmbed] });

		}


		return;

	},

};