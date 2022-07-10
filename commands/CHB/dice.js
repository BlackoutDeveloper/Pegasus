// requirements
const { Collection, Client, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

const Discord = require('discord.js')
// module
module.exports = {
	name: 'roll',
	category: 'CHB',
	usage: '%roll[NUMBER]',
	image: '',
	requirements: ['NONE'],
	description: 'Rolls a dice',
	run: async (client, message, args) => {
        const sd = client.emojis.cache.get('874733624258351115')
        console.log(args[0])
        
		
		if (args[1]) {
			
			
			for (var i =0;i<args[1];i++) {
				const leroll = Math.floor(Math.random() * args[0]) + 1
				message.channel.send(`${sd} <@${message.author.id}> Rolled: ${leroll} (${i+1} of ${args[1]}) ${sd}`)
				
			}
		}
		else {
			
			const leroll = Math.floor(Math.random() * args[0]) + 1
			message.channel.send(`${sd} <@${message.author.id}> Rolled: ${leroll} ${sd}`)
		}
        message.delete()
        
    }
}
