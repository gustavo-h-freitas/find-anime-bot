const Discord = require('discord.js')
const client = new Discord.Client()
const token = 'tokenGoesHere'
const axios = require('axios')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  let first = msg.content.split(' ')[0]

  if (first === '&find') {
    msg.reply('Pera um pouquinho ai que eu tô procurando!')

    if (msg.attachments || msg.embeds) {
      let att = msg.attachments.map(el => el.attachment)[0] ? msg.attachments.map(el => el.attachment)[0] : msg.embeds.map(el => el.url)[0]
      axios.get(`https://trace.moe/api/search?url=${att}`)
        .then(r => {
          console.log(r.data)
          let first_result = r.data.docs[0]
          msg.reply(`O nome do anime é ${first_result.anime} ${first_result.anime === first_result.title_english ? '' : 'ou ' + first_result.title_english}`)
          if (r.data.docs[0].is_adult) {
            msg.reply('Cuidado ao ver esse anime em público ou com seus pais por perto')
          }
          msg.reply(`Dê uma olhada nesse curta do anime: https://media.trace.moe/video/${first_result.anilist_id}/${encodeURIComponent(first_result.filename)}?t=${first_result.at}&token=${first_result.tokenthumb}`)
        })
        .catch(err => {
          console.log(err)
          msg.reply('Infelizmente não consegui achar esse anime :(')
        })
    }
  }
})

client.login(token)