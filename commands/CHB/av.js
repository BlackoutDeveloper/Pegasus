// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'av',
	category: 'CHB',
	usage: '%av [ID]',
	image: '',
	requirements: ['NONE'],
	description: 'Sends the avatar of a user',
	run: async (client, message, args) => {
        const membero = message.mentions.members.first() || client.users.cache.get(`${args[0]}`)
        console.log(membero)
        if (membero.username) {
            const embedero = new MessageEmbed()
                .setTitle(membero.username + '#' + membero.discriminator + '\'s Avatar')
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ size:4096, dynamic: true }))
                .setImage(membero.displayAvatarURL({ size: 4096, dynamic: true }))
                .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
                .setColor(colours.CHB)
            message.delete()
            message.author.send({ embeds: [embedero] })
        }
        else {
            const embederus = new MessageEmbed()
                .setTitle(membero.user.username + '#' + membero.user.discriminator + '\'s Avatar')
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ size:4096, dynamic: true }))
                .setImage(membero.displayAvatarURL({ size: 4096, dynamic: true }))
                .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
                .setColor(colours.CHB)
            message.delete()
            message.author.send({ embeds: [embederus] })
        }
        
        
        
	},
};

