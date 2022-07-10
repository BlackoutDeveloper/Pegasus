// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'log',
	category: 'info',
	usage: '%log [MESSAGE',
	image: '',
	requirements: ['NONE'],
	description: 'Logs A Message For The Developer To See',
	run: async (client, message, args) => {
        console.log(message.content)
        message.delete()
	},
};

