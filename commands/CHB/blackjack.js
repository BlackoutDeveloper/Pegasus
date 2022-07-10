// requirements
const { Collection, Client, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const colours = require('../../configs/colours.json');
const blackjack = require('discord-blackjack')
// module

module.exports = {
	name: 'blackjack',
	category: 'CHB',
	usage: '%blackjack',
	image: '',
	requirements: ['NONE'],
	description: 'Plays Blackjack',
	run: async (client, message, args) => {
		
        let game = await blackjack(message, Discord)
	},
};

