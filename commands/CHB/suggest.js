// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const images = require('../../configs/images.json')
// module

module.exports = {
	name: 'suggest',
	category: 'CHB',
	usage: '%suggest',
	image: '',
	requirements: ['NONE'],
	description: 'Sends A Suggestion For Both Bot Developer And Staff To View',
	run: async (client, message, args) => {
        message.delete()
        let emb = new MessageEmbed()
            .setColor(colours.CHB)
            .setTitle('Your Suggestion Was Sent')
            .setDescription('If this is a bot suggestion then check %help at some point to see if it was used, else wait and see!')
            .setThumbnail(images.logo)
        message.author.send({ embeds:[emb] })
        let sug = message.guild.channels.cache.find(c => c.name.toLowerCase() === 'suggestions')
        let sugge = args.join(' ')
        let suge = new MessageEmbed()
            .setTitle(`${message.author.username}'s Suggestion`)
            .setColor(colours.CHB)
            .setDescription(sugge)
        await sug.send({ embeds:[suge] })
	},
};

