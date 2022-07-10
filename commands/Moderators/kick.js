// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'kick',
	category: 'Moderation',
	usage: '%kick',
	image: '',
	requirements: ['MOD'],
	description: 'Kick People',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        message.delete()
        
        const roles = membero.roles.cache.find(r => r.name.toLowerCase() === 'mods')
        
        if (!roles && message.author.id !== '350954110654087169') return;
        const memberi = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        memberi.kick()
        let priv = client.guild.channels.cache.find(c => c.name.toLowerCase() == 'mod-logs')
        let pri = new MessageEmbed()
            .setTitle('Member Kicked')
            .setDescription(`<@${memberi.id}> was banned by <@${message.author.id}>`)
            .setColor(colours.CHB)
            .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
        priv.send({ embeds:[pri] })
	},
};

