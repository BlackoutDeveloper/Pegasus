// Constants
const { Collection, Client, Intents, Permissions, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

const fs = require('fs');
const mongoose = require('mongoose')
const config = require('./configs/config.json')
const prefix = config.prefix
const colours = require('./configs/colours.json')
const { connection } = require('./handlers/database')
const profileModel = require('./schemas/profileModel');
//const reactions = require('./handlers/reactions');
const { deletedMessageLogger } = require('./handlers/sniper');
const images = require('./configs/images.json')
const ticketSchema = require('./schemas/ticket')
const moment = require('moment')
let allMessages = []
const blackjack = require('discord-blackjack')
const guildDocu = require('./schemas/guild')
let Filter = ( m ) => m.content != null;

// Intents
const myIntents = new Intents();
// Guild Intents
myIntents.add('GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS');
// Direct Intents
myIntents.add('DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS');

// Client Creation
const client = new Client({
    allowedMentions: {
        parse: ["users", "roles", "everyone"],
        repliedUser: true
    },
    intents: myIntents
});
// Blacklisted Words
const bl = ['nigger', 'niggers', 'nigga', 'niggas', 'die', 'shits', 'shitting', 'shitter', 'shitty', 'bullshit', 'bullshitting', 'bullshits', 'bitches', 'bitching', 'bitchy', 'whores', 'whorey', 'whorish', 'sluts', 'slutty', 'arson', 'fuck', 'shit', 'bitch', 'whore', 'slut', 'fag', 'homophobe', 'homophobic', 'homophobia', 'stabbing', 'stabs', 'stabbed', 'killed', 'kills', 'faggot', 'faggots', 'dies', 'died', 'dead', 'fucking', 'fucker', 'fucks', 'motherfucker', 'motherfucking', 'homophobes', 'motherfucker', 'stab', 'kill', 'murderer', 'killer', 'murdering', 'choking', 'chokes', 'murder', 'choke', 'dick', 'raping', 'rapes', 'rapist', 'rape', 'cock', 'pussy', 'pussies', 'bastard', 'blood', 'bloody', 'twats', 'twat', 'cunt', 'cunts', 'abuse', 'abusive', 'abusing', 'abuser', 'abused', 'anal', 'anals', 'sex', 'sexual', 'ass', 'blowjob', 'boner', 'chink', 'deepthroat', 'deepthroats', 'hell', 'homicide', 'homicidal', 'incest', 'kink', 'molest', 'molested', 'molester', 'negro', 'negroes', 'paki', 'pakis', 'penis', 'tranny']
let mess = []
let found = false
let messa = ''
let ker = ''
// Collections
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync('./commands/');
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
	console.log(`Ready! Signed in as ${client.user.username}`);
	client.user.setStatus('dnd')
	client.user.setActivity('The Stables', { type: 'WATCHING' });
	
	connection(client);
	
});
client.on('messageCreate', async (message) => {
	if(!message.guild || message.author.bot) return;
	const checker = await profileModel.findOne({ userID: message.author.id })
	if (!checker) {
		let newProfile = new profileModel({
			userID: message.author.id,
			AFK: false
		}).save();
	}
	if (checker?.AFK == true) {
		if (!message.content.startsWith('%afk')) {
			await profileModel.findOneAndUpdate({ userID: message.author.id }, { AFK: false })
			message.author.send('You are no longer afk!')
			console.log(message.member.nickname)
			const newNick = message.member.nickname?.replace('[AFK]', '');
			message.member.setNickname(newNick);
		}
	}
	if (!message.content.includes('||')) {
		mess = message.content.split(' ')
		found = false
		messa = ''
		for (var i = 0; i<mess.length; i++) {
			ker = mess[i]
			for (var j in bl) {
				if (ker.includes(',')) {
					ker = ker.replace(',', '')
				}
				if (ker.includes('.')) {
					ker = ker.replace('.', '')
				}
				if (ker.includes('?')) {
					ker = ker.replace('?', '')
				}
				if (ker.includes('!')) {
					ker = ker.replace('!', '')
				}
				if (ker.includes(':')) {
					ker = ker.replace(':', '')
				}
				if (ker.includes(';')) {
					ker = ker.replace(';', '')
				}
				if (ker.includes('-')) {
					ker = ker.replace('-', '')
				}
				if (ker.includes('(')) {
					ker = ker.replace('(', '')
				}
				if (ker.includes(')')) {
					ker = ker.replace(')', '')
				}
				if (ker.includes('"')) {
					ker = ker.replace('"', '')
				}
				if (ker.toLowerCase() == bl[j]) {
					found = true
					mess[i] = '||' + mess[i] + '||'
				}
				
				j += 1
			}
			messa = messa + ' ' + mess[i]
		}
		if (found == true) {
			message.delete()
			message.channel.send(`<@${message.member.user.id}>: "` + messa + `"`)
		}
	}
    if(!message.content.startsWith(prefix)) return;

	try {
		if(!message.member) message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		let command = client.commands.get(cmd);
		if(!command) command = client.commands.get(client.aliases.get(cmd));
		if(!command) return;
		command.run(client, message, args);
	}
	catch (err) {
		message.channel.send(`\`${err}\``);
		return;
	}
	
});
client.on('messageDelete', async messageDelete => {
	if(!messageDelete.guild || messageDelete.author.bot || messageDelete.content.startsWith('%')) return;
	await deletedMessageLogger(messageDelete, client);
})
client.on('messageUpdate', async (oldMessage, newMessage) => {
	
	if(oldMessage.author.bot || !oldMessage.guild || oldMessage.content == URL) return;

	const editLogs = oldMessage.guild.channels.cache.find(channel => channel.name.toLowerCase() === 'message-logs');
	if(editLogs) {
		if (oldMessage.content == newMessage.content) return null;
		const embed = new MessageEmbed()
			.setTitle('Edited Message')
			.setColor(colours.CHB)
			.addFields({ name: 'Author', value: `${oldMessage.author.tag}`, inline:true })
			.addFields({ name: 'Channel', value: `${oldMessage.channel}`, inline: true })
			.addFields({ name: 'Original', value: `${oldMessage.content}` })
			.addFields({ name: 'Edited', value: `${newMessage.content}`, inline: true })
			.addFields({ name: 'Time', value: `${new Date()}` })
			.setFooter(`Message ID: ${newMessage.id} | Author ID: ${oldMessage.author.id} | Pegasus`);
		editLogs.send({ embeds:[embed] });
		

	}
	if (!oldMessage.author.bot) {
		if (oldMessage.mentions.members.size > newMessage.mentions.members.size || oldMessage.mentions.roles.size > newMessage.mentions.roles.size) {
			let arratus = []
			oldMessage.mentions.members.forEach((member) => {
				arratus.push(`<@${member.id}>`)
			})
			oldMessage.mentions.roles.forEach((role) => {
				arratus.push(`<@&${role.id}>`)
			})
			
			
		}
	}
});
client.on('guildMemberAdd', async (member) => {
	let offc = member.guild.channels.cache.find(c => c.name.toLowerCase() === 'welcome')
	let priv = member.guild.channels.cache.find(c => c.name.toLowerCase() == 'mod-logs')
	let pri = new MessageEmbed()
		.setTitle('New Member')
		.setDescription(`${member.user.username}#${member.user.discriminator} joined! Their @ is <@${member.id}>`)
		.setColor(colours.CHB)
		.setThumbnail(images.logo)
		.setFooter('Pegasus', client.user.displayAvatarURL({ size:4096, dynamic: true }))
	priv.send({ embeds:[pri] })
	offc.send(`Hey <@${member.id}>, welcome to **CHB**! Hello fellow demigod to Camp Half-Blood! Hopefully you trip to Long Island wasn't too dangerous! Swing by <#850527028516094003> to become a camper, then head on down to <#850810265137315840> ! After that, you can go to <#851170357897330749> to start creating your character! If you have any questions, you can DM a moderator from the <#850529951191269376>`)
})
client.on('interactionCreate', async (interaction, user) => {
        
	console.log('1')	
	if(interaction.user.bot) return
	console.log('2')
	
	switch(interaction.customId) {
		case 'end' :
			close(interaction, user);
			break;
		case 'begin' :
			if(interaction.channel.id != '858058643651297280') return;
			console.log('eh')
			create(interaction, user);
			break;
		
	}
})

async function create(interaction, user) {
	const checker = await guildDocu.findOne({ ID: 1 })
	const guild = client.guilds.cache.get(interaction.guildId)
	
	
	if (!checker) {
		
		let doc = new guildDocu({
			tCount: 0,
			ID: 1,
			Idrt: user.id,
		})
		
		await doc.save().catch(err => console.log(err));
	}
	const dec = await guildDocu.findOne({ ID: 1 })
	dec.tCount += 1
	await guildDocu.findOneAndUpdate({ ID: 1 }, { tCount: dec.tCount })
	
	const ticketChannel = await guild.channels.create(`Ticket-${interaction.user.username}-${dec.tCount}`, {
		type: 'text',
		permissionOverwrites: [
			{
				id: interaction.user.id,
				allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],

			},
			{
				id: guild.id,
				deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
			},
			{
				id: '850528026021724171',
				allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
			}
		],
	}).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`))
	let channel = await guild.channels.cache.get(c => c.name.toLowerCase() == ticketChannel.name.toLowerCase() && c.type == 'text')
	let cate = await guild.channels.cache.get(c => c.name.toLowerCase() == 'tickets' && c.type == 'category');
	
	if (channel && cate) await channel.setParent(cate.id).catch(err => console.log(`Ticket Creation - Error occured: ${err}`))
	await ticketChannel.edit(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
	const row = new MessageActionRow().addComponents(
		new MessageButton()
			.setStyle('DANGER')
			.setLabel('CLOSE')
			.setCustomId('end')
	)
	const ticketEmbed = new MessageEmbed()
		.setAuthor(`Ticket ${interaction.user.username}`)
		.setColor(colours.CHB)
		.setDescription(`Please do not spam ping staff to get to this ticket, abuse of this system will result in losing access to tickets`)
		.setFooter('Pegasus')
	
	
	const msg = await ticketChannel.send({ embeds: [ticketEmbed], components: [row] }).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
	await ticketChannel.send(`<@${interaction.user.id}> here is your ticket`).then(m => m.delete({ timeout: 15000 })).catch(err => console.log(`Ticket Creation - Error Occured: ${err}`));
	
	const tickDoc = new ticketSchema({
		UserID: interaction.user.id,
		tNumber: dec.tCount,
		ChannelID: ticketChannel.id,
	})
	await tickDoc.save()
}
async function  close(interaction, user) {
	const leuser = guildDocu.findOne({ ID: 1 })
	const member = interaction.member
	const owner = await interaction.guild.members.cache.get('350954110654087169')
	if(!member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && member.id !== '350954110654087169') return interaction.message.channelId.send('You Don\'t Have Permission To Close Ticket')
	const { message } = interaction;
	const guild = client.guilds.cache.get(interaction.guildId);
	const ticketDoc = await ticketSchema.findOne({ ChannelID: interaction.channelId })
	const chael = guild.channels.cache.get(interaction.channelId)
allMessages = [];
await fetchMore(chael, 500).then(async messages => {
	console.log(`${messages.size} Grabbed.`);
	

	const putInArray = async (data) => await allMessages.push(data);
	const handleTime = (timestamp) => moment(timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM"); 
	let mas;
	mas = Array.from(messages.values());

	for (const message of mas.reverse()) await putInArray(`${handleTime(message.timestamp)} ${message.author.username} : ${message.content}`); 
});
if (!fs.existsSync(`./logs/${message.guild.id}`)) {
	await fs.mkdir(`./logs/${message.guild.id}`, function(err) {
		if (err) {
		  console.log(err)
		} 
		else {
		  console.log("New directory successfully created.")
		}
	})
} 
await fs.writeFileSync(`./logs/${message.guild.id}/Ticket-${ticketDoc.tNumber}.txt`, allMessages.join('\n'), error => {
	if(error) console.log(error);
});
const attachment = new MessageAttachment(`./logs/${interaction.guildId}/Ticket-${ticketDoc.tNumber}.txt`, `Ticket-${ticketDoc.tNumber}.txt`);
const ticketCloseEmbed = new MessageEmbed()
	.setAuthor(`Your Ticket has been Closed.`)
	.setColor(colours.CHB)
	.setThumbnail('https://therockandblues.com/wp-content/uploads/2018/07/tickets.png')
	.setDescription(`Ticket ID: ${ticketDoc.tNumber} | Closed By ${interaction.user.tag}`)
	.setFooter('Pegasus')
	.setTimestamp();
const ticketEmbed = new MessageEmbed()
	.setAuthor(`${member.user.tag}'s Ticket Has Been Closed`)
	.setColor(colours.CHB)
	.setDescription(`Ticket ID: ${ticketDoc.tNumber} | Closed By ${interaction.user.tag}`)
	.setFooter(`Pegasus`);

	
try {
	console.log('ye')
	const canel = guild.channels.cache.get(interaction.channelId);
	console.log('hm')
	console.log(canel.id)
	await canel.delete().catch(err => console.log(`3. Reaction Ticket Close - Error Occured: ${err}`));
	console.log('naw')
	await member.send({ embeds: [ticketCloseEmbed], files: [ attachment ] }).catch(err => console.log(`1. Reaction Ticket Close - Error Occured: ${err}`));
	await owner.send({ embeds: [ticketCloseEmbed], files: [ attachment ] }).catch(err => console.log(`1. Reaction Ticket Close - Error Occured: ${err}`));
	
	console.log('ie')
	let logger = guild.channels.cache.find(c => c.name.toLowerCase() == 'transcripts');
	await logger.send({ embeds: [ticketEmbed], files: [ attachment ]});
	await ticketDoc.deleteOne().catch(err => console.log(`4. Reaction Ticket Close - Error Occured: ${err}`));;
}
catch (err) {
	console.log(`Reaction Close Error Occured: ${err}`);
}
}
async function fetchMore(channel, limit = 500) {
    if (!channel) {
      throw new Error(`Expected channel, got ${typeof channel}.`);
    }
    if (limit <= 100) {
      return channel.messages.fetch({ limit });
    }
  
    let collection = new Collection();
    let lastId = null;
    let options = {};
    let remaining = limit;
  
    while (remaining > 0) {
      options.limit = remaining > 100 ? 100 : remaining;
      remaining = remaining > 100 ? remaining - 100 : 0;
  
      if (lastId) {
        options.before = lastId;
      }
  
      let messages = await channel.messages.fetch(options);
  
      if (!messages.last()) {
        break;
      }
  
      collection = collection.concat(messages);
      lastId = messages.last().id;
    }
  
    return collection;
  }
client.login(config.token);

