
const TicketData = require('../../schemas/ticket')
// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed, MessageActionRow, MessageButton, MessageCollector, Permissions } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'ts',
	category: 'tickets',
	usage: '%ts [CHANNEL]',
	image: '',
	requirements: ['DEVELOPER'],
	description: 'Sets Up The Ticket System',
	run: async (client, message, args) => {
        const membero = message.guild.members.cache.get(message.author.id)
        
        const roles = membero.roles.cache.find(r => r.name.toLowerCase() === 'admin')
        
        if (!roles && message.author.id !== '350954110654087169') return;
        const chanel = message.mentions.channels.first()
        if (!chanel) return message.channel.send('...what channel?')
        const embedi = new MessageEmbed()
            .setColor(colours.CHB)
            .setTitle('Tickets!')
            .setDescription('Click the button to open a ticket!')
            .setFooter('Pegasus', client.user.displayAvatarURL({ size: 4096, dynamic: true }))
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('Create Ticket')
                .setCustomId('begin')
        )
        const msg = await chanel.send({ embeds: [embedi], components: [row] })
        message.delete()
        
        
    }

    
};

