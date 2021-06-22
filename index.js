require('dotenv').config()
const mySecret = process.env.TOKEN
const mongoPass = process.env.mongoPass
const prefix = process.env.prefix
const Brawlstars = require("brawlstars.js")
const Discord = require('discord.js')
const mongoose = require('mongoose')
const client = new Discord.Client()
const token  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImEwMjBjYmQ5LTdkZmItNDA4MS1iNDQ1LWE4MGFlZWJmMmEzNyIsImlhdCI6MTYxOTQ2NzMxOCwic3ViIjoiZGV2ZWxvcGVyL2ZhYjVhMzFlLWMzNzYtYzlhOS0xMWFkLTFlYjNhMDQ3MDEwNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNS4xOTYuMTAwLjIzMiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.VqzY1uLCSxad4faP3XHPAxObjE292W4w-5Uu4NlgMAEsW2fituB9Ya5iD7dNG0bkRpSNOlwLFdzAYMKH3mcPAQ"

mongoose.connect(mongoPass, {
    useNewUrlParser: true
})

const bsclient = new Brawlstars.Client(token)
client.on('ready', () => {
  console.log(`Client ready on ${client.user.tag}`)
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    if (command === 'bs') {
    const player = await bsclient.getPlayer((message.content.slice(4)));
    const bsembed = new Discord.MessageEmbed().setTitle('Ben jij dit?').setColor(0x008080).addFields(
		{ name: 'Player Name', value: `\`${player.name}\`` },
		{ name: 'Level', value: `\`${player.expLevel}\`` },
		{ name: 'Trophies', value: `\`${player.trophies}\``, inline: true },
		{ name: 'Tag', value: `\`${player.tag}\``, inline: true },
	);
    message.channel.send(bsembed)
  }
 else if (command === 'profile') {
    message.channel.startTyping();
    const player = await bsclient.getPlayer((message.content.slice(9)));
    const brawlers = await bsclient.getBrawlers()
    const trophy = '<:BStrophy:801769136296296508>'
    const threevsthree = '<:3v3:837645809645387806>'
    const roborumble = '<:RoboRumble:807318775233380403>'
    const club = '<:club:837649601191739392>'
    const solo = '<:SoloShowdown:807236285097312286>'
    const brawler = '<:brawllogo:837662019128786984>'
    const duo = '<:DuoShowdown:807236327103397899>'
    const level = '<:level:837649678291959818>'
    const bsembed = new Discord.MessageEmbed().setColor(player.getColor(player.nameColor)).setAuthor(`${player.name} \(${player.tag})`).addFields(
		{ name: 'Club', value: `\`${player.club.name} \(${player.club.tag})\` ${club}` },
		{ name: 'Level', value: `\`${player.expLevel}\` ${level}` },
		{ name: 'Trophies', value: `\`${player.trophies}\` ${trophy}`, inline: true },
		{ name: 'Highest Trophies', value: `\`${player.highestTrophies}\` ${trophy}`, inline: true },
        { name: 'Brawlers', value: `\`${player.brawlerCount}/${brawlers.count}\` ${brawler}`},
        { name: '3v3 Victories', value: `\`${player.getWins(3)}\` ${threevsthree}`},
        { name: 'Solo Victories', value: `\`${player.getWins(1)}\` ${solo}`},
        { name: 'Duo Victories', value: `\`${player.getWins(2)}\` ${duo}`},
  );
     message.channel.send(bsembed);
     message.channel.stopTyping();
}
else if (command === 'name') {
const player = await bsclient.getPlayer((message.content.slice(6)));
message.channel.send(`${player.name}`)
}
})

client.login(mySecret)
