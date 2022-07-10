// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'add-user',
	category: 'tickets',
	usage: '%add-user [USER ID]',
	image: '',
	requirements: ['KICK_MEMBERS'],
	description: 'Adds a user to a ticket',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        
        const roles = membero.roles.cache.find(r => r.name.toLowerCase() === 'admin')
        
        if (!roles && message.author.id !== '350954110654087169') return;
        const addition = message.guild.members.fetch(args[0]) || message.mentions.members.first()
        if (!addition) return message.reply('Try again')
        message.channel.overwritePermissions([
            {
                id: addition.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
            {
                id: message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            }
        ], 'Permissions')
        message.channel.send(`Added <@${addition}> To <#${message.channel.id}>`)
	},
};

