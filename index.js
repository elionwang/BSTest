const Brawlstars = require("brawlstars.js")
const Discord = require('discord.js')
const DiscordClient = new Discord.Client()
const command = require('./command')
const token  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRmMWFkNTExLTZmOGMtNDI0NC04ODE2LTdjYjllZTI0ZGM0MCIsImlhdCI6MTYxODkyMTgxNywic3ViIjoiZGV2ZWxvcGVyL2ZhYjVhMzFlLWMzNzYtYzlhOS0xMWFkLTFlYjNhMDQ3MDEwNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzQuNzIuMTAxLjkxIiwiMzQuNjYuODAuMTgyIl0sInR5cGUiOiJjbGllbnQifV19.rP_Afxpsp0UfQkWdgyJhWRgWa3hrhk5Cj7wLHkf6BD5fqsCX_vTEoUSn43-kWW89RBDYYLhwcxlKSGtwA22gWA"

const client = new Brawlstars.Client(token)


;(async function () {
  const X = '###########################'
  const player = await client.getPlayer('#PYV80U2J')
  
  console.log(X)
  console.log(player.name)
  console.log(player.highestTrophies)
  console.log(player.brawlerCount)
  console.log(player.getWins(Brawlstars.Constants.WIN_TYPE_TRIO))
  console.log(player.getWins(Brawlstars.Constants.WIN_TYPE_TOTAL));
  console.log(player.gadgetsCount) 
  console.log(player.starpowersCount)

  console.log('By Name:', player.getBrawlerByName('MAX'))
  console.log('By ID:', player.getBrawlerById('16000020'))

  console.log('Rumble', player.bestRoboRumbleTime) 
  console.log('BigBrawler', player.bestTime(1))

  if (player.club) {
    const club = await client.getClub(player.club.tag)
    console.log(X)
    console.log(club.type)
    console.log(club.getMemberRank(player.tag))
    console.log(club.getMemberRole(player.tag))
    console.log(club.isFull)
  }
  
  const FrenchRank = await client.getRanking('FR', 'players')
  console.log(X)
  console.log(FrenchRank.getTop(3))
  console.log(FrenchRank.isRanked(player.tag))
  const brawlers = await client.getBrawlers()
  console.log(X)
  console.log(brawlers.count)
  console.log(brawlers.getBrawlersNames())
  console.log(brawlers.getBrawlerStarPowersByName('FRANK'))
})()

DiscordClient.on('ready', () => {
  console.log(`Client ready on ${client.user.tag}`)
  
  command(client, 'ping', (message) => {
    message.reply('Ping aan het berekenen...').then(resultMessage => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp
      
      resultMessage.edit(`Bot latency: \`${ping} ms\` API latency: \`${client.ws.ping} ms\``)
    })
  })
  
  command(client, 'name', (message) => {
    
    message.reply(player.name)
  })
})

DiscordClient.login(process.env.TOKEN)