// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'purge',
	category: 'Moderators',
	usage: '%purge',
	image: '',
	requirements: ['ADMIN'],
	description: 'Purges A Channel Of Messages Newer Than Two Weeks',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        const roles = membero.roles.cache.find(r => r.name.toLowerCase() === 'mods')
        if (!args[1]) return;
        if (!roles && message.author.id !== '350954110654087169') return;
        const chanel = message.mentions.channels.first()
        if (!chanel) return message.channel.send('...what channel?')
        const amo = args[1]
        chanel.bulkDelete(amo)
        message.channel.send('Done!')
        message.delete()

	},
};

