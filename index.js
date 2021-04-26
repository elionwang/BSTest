const mySecret = process.env['TOKEN']
const prefix = process.env['prefix']
const Brawlstars = require("brawlstars.js")
const Discord = require('discord.js')
const client = new Discord.Client()
const token  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjcxNTE4ZjFhLWI0NTQtNDVjMS04YzU3LTRhZjM0ODI0OTJjNyIsImlhdCI6MTYxOTQ2MjY0OCwic3ViIjoiZGV2ZWxvcGVyL2ZhYjVhMzFlLWMzNzYtYzlhOS0xMWFkLTFlYjNhMDQ3MDEwNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTA0LjE5Ny4xMjQuODQiLCIzNC43Mi4xMTQuMTQ4IiwiMTA0LjE1NS4xNDQuMjI4IiwiMzUuMjAyLjIzMS4xMSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.XYwmoyC3zTb2KIA5ZmY6sb5rTxhJwZbiX7s3s7k1DWXYsXM8kAG_EDia1q4saYf3YgLr4uJQCXFv_7n9wM4lRA"
const bsclient = new Brawlstars.Client(token)
require('dotenv').config()

client.on('ready', () => {
  console.log(`Client ready on ${client.user.tag}`)
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === 'bs') {
    const player = await bsclient.getPlayer((message.content.slice(6)));
    const bsembed = new Discord.MessageEmbed().setTitle('Ben jij dit?').setColor(0x008080).addFields(
		{ name: 'Player Name', value: player.name },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Trophies', value: `\`${player.trophies}\``, inline: true },
		{ name: 'Club', value: player.club.name, inline: true },
	);
    message.channel.send(bsembed)
  }
})

client.login(mySecret)