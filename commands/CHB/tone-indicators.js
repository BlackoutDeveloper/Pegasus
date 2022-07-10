// requirements
const { Collection, Client, Discord, MessageAttachment, Util, MessageEmbed } = require('discord.js');
const colours = require('../../configs/colours.json');
const images = require('../../configs/images.json')
// module

module.exports = {
	name: 'ti',
	category: 'CHB',
	usage: '%ti',
	image: '',
	requirements: ['NONE'],
	description: 'Displays all tone indicators on the server',
	run: async (client, message, args) => {
        const embedro = new MessageEmbed()
            .setColor(colours.CHB)
            .setTitle('Tone Indicators!')
            .addField('Why do we have these?', 'For neurodivergent people, and sometimes just in text, it is hard to tell the tone to read something, these solve that! Just put the indicator on the end of your message to make sure everyone understands it.')
            .addField('Indicators!', '/j - joking\n/hj - half joking\n/s or /sarc - sarcastic / sarcasm\n/srs - serious\n/nsrs - not serious\n/lh - light-hearted\n/ij - inside joke\n/ref - reference\n/t - teasing\n/nm - not mad\n/nbh - nobody here\n/g or /gen - genuine / genuine question\n/th - threat\n/cb - clickbait\n/f - fake\n/q - quote\n/l or /ly - lyrics\n/c - copypasta\n/m - metaphor / metaphorically\n/li - literal / literally\n/rt or /rh - rhetorical\n/hyp - hyperbole\n/p - platonic\n/r - romantic\n/pc or /pos - positive connotation\n/nc or /neg - negative connotation\n/neu - neutral / neutral connotation')
            .setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic:true }))
            .setThumbnail(images.logo)
        message.delete()
        message.author.send({ embeds: [embedro] })
	},
};

