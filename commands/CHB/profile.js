// requirements
const { Collection, Client, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const { Presence } = require('discord.js')
const { Discord } = require('discord.js')
const colours = require('../../configs/colours.json');
const moment = require('moment')
// module

module.exports = {
	name: 'profile',
	category: 'CHB',
	usage: '%profile [ID]',
	image: '',
	requirements: ['NONE'],
	description: 'Sends the profile of a user',
	run: async (client, message, args) => {
        let membero = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        if (!args[0]) membero = message.guild.members.cache.get(message.author.id)
        const roles = membero.roles.cache
   			.sort((a, b) => b.position - a.position)
    		.map(role => role.toString())
	    	.slice(0, -1);
        
        const pres = client.emojis.cache.get('829065303831871539')
        
        const joinDiscord = moment(membero.createdAt).format('llll');
        const joinServer = moment(membero.joinedAt).format('llll');
        let embedero = new MessageEmbed()
            .setTitle(`${membero.user.username}#${membero.user.discriminator} ID: ${membero.id}`)
            .setColor(colours.CHB)
            .setThumbnail(membero.user.displayAvatarURL())
        	.addField('Roles:', `${roles.length}:** ${roles.join(', ')}**`, false)
			.addField('Joined at:', `${new Date(membero.joinedTimestamp).toLocaleDateString()}`)
			.addField('Joined Discord:', `${new Date(membero.user.createdTimestamp).toLocaleDateString()}`, true)
            .addField('ID', `${membero.user.id}`)
            .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
        
        
        message.channel.send({ embeds: [embedero] })
        message.delete()
	},
};

