
// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');

// module

module.exports = {
	name: 'poll',
	category: 'Moderators',
	usage: '%poll [Title/Question] | [Amount of Options] | [Option 1] | [Option 2] etc.',
	image: '',
	requirements: ['KICK_MEMBERS'],
	description: 'Starts A Poll',
	run: async (client, message, args) => {
        message.delete()
        
        const membero = message.guild.members.cache.get(message.author.id)
        
        const roles = membero.roles.cache.find(r => r.name.toLowerCase() === 'mods')
        
        if (!roles) return;
        let pollChannel = message.channel.id;
        const optionargs = await message.content.split('|')
        const leng = optionargs.length
        if (leng > 5) return message.user.send('Too Many Options')
        let pollTitle = optionargs[0]
        if (optionargs[1] == 2) {
            let embedi = new MessageEmbed()
                .setTitle(pollTitle)
                .addField('One', `${optionargs[2]}`)
                .addField('Two', `${optionargs[3]}`)
                .setColor(colours.CHB)
                .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
            let msgembed = await message.channel.send({ embeds: [embedi] })
            msgembed.react('1️⃣')
            msgembed.react('2️⃣')
        }
        if (optionargs[1] == 3) {
            let embedi = new MessageEmbed()
                .setTitle(pollTitle)
                .addField('One', `${optionargs[2]}`)
                .addField('Two', `${optionargs[3]}`)
                .addField('Three', `${optionargs[4]}`)
                .setColor(colours.CHB)
                .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
            let msgembed = await message.channel.send({ embeds: [embedi] })
            msgembed.react('1️⃣')
            msgembed.react('2️⃣')
            msgembed.react('3️⃣')
        }
        if (optionargs[1] == 4) {
            let embedi = new MessageEmbed()
                .setTitle(pollTitle)
                .addField('One', `${optionargs[2]}`)
                .addField('Two', `${optionargs[3]}`)
                .addField('Three', `${optionargs[4]}`)
                .addField('Four', `${optionargs[5]}`)
                .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
                .setColor(colours.CHB)
            let msgembed = await message.channel.send({ embeds: [embedi] })
            msgembed.react('1️⃣')
            msgembed.react('2️⃣')
            msgembed.react('3️⃣')
            msgembed.react('4️⃣')
        }
        if (optionargs[1] == 5) {
            let embedi = new MessageEmbed()
                .setTitle(pollTitle)
                .addField('One', `${optionargs[2]}`)
                .addField('Two', `${optionargs[3]}`)
                .addField('Three', `${optionargs[4]}`)
                .addField('Four', `${optionargs[5]}`)
                .addField('Four', `${optionargs[6]}`)
                .setColor(colours.CHB)
                .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
            let msgembed = await message.channel.send({ embeds: [embedi] })
            msgembed.react('1️⃣')
            msgembed.react('2️⃣')
            msgembed.react('3️⃣')
            msgembed.react('4️⃣')
            msgembed.react('5️⃣')
        }
	},
};

//const arry = ['one','two','three','four','five','six','seven','eight','nine']