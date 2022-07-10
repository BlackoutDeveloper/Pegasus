// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const profileModel = require('../../schemas/profileModel');
const mongoose = require('mongoose');
// module

module.exports = {
	name: 'afk',
	category: 'CHB',
	usage: '%afk',
	image: '',
	requirements: ['NONE'],
	description: 'Sets You To AFK!',
	run: async (client, message, args) => {
        message.delete()
		console.log(message.member.user.username)
		const checkerin = await profileModel.findOne({ userID: message.author.id, AFK: false })
		if (checkerin) {
			if (message.member.nickname == null) {
				await profileModel.findOneAndUpdate({ userID: message.author.id, AFK: false }, { AFK: true })
				message.member.setNickname('[AFK]' + message.member.user.username)
        		message.author.send('You are now afk!')
			}
			else {
				await profileModel.findOneAndUpdate({ userID: message.author.id, AFK: false }, { AFK: true })
				message.member.setNickname('[AFK]' + message.member.nickname)
        		message.author.send('You are now afk!')
			}
		}
		if (!checkerin) {
			message.author.send('You are already afk!')
		}
		
	},
};

