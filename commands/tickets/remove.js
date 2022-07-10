// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'remove-user',
	category: 'tickets',
	usage: '%remove-user [USER ID]',
	image: '',
	requirements: ['KICK_MEMBERS'],
	description: 'Removes a user from a ticket',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        
        const roles = membero.roles.cache.find(r => r.name.toLowerCase() === 'admin')
        
        if (!roles && message.author.id !== '350954110654087169') return;
        const addition = message.guild.members.fetch(args[0]) || message.mentions.members.first()
        if (!addition) return message.reply('Try again')
        message.channel.overwritePermissions([
            {
                id: addition.id,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            }
        ], 'Permissions')
        message.channel.send(`Removed <@${addition}> From <#${message.channel.id}>`)
	},
};

