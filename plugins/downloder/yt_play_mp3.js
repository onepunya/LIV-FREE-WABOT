const axios = require('axios')
neoxr.create(async (m, {
      client,
      chats,
      command,
      prefix,
      text,
      Func,
      Scraper
   }) => {
      try {
           if (!text) return client.reply(m.chat, Func.example(prefix, command, 'lathi'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Anya.playmp3(text)
        let caption = `*YOUTUBE AUDIO*\n\n`
          caption += `*TITLE*: ${json.title}\n`
         caption += `*CHANNEL*: ${json.channel}\n`
         caption += `*VIEWS*: ${json.views}\n`
         caption += `*PUB*: ${json.published}\n`
         caption += global.footer   
        let thum = json.thumb      
         await client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.thumb)
            }).then(() => client.sendMessage(m.chat, { audio: { url: json.url }, ptt: false, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,3,58,44,35,32,2,4,31,35,44,34,48,13,0,54,49,40,1,44,50,51,16,0,3,40,39,46,3,42,38,44,46,0,0,47,0,0,46,19,20,48,43,49,0,0,39,40,31,18,29,17,25,37,51,22,37,34,19,11,17,12,16,19] }, { quoted: m }))
           
           
       } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.texted('bold', e.message), m)
   }
}, {
   usage: ['playaud'],
   hidden: ['music', 'audio', 'musik', 'pla'],
   use: 'query',
   category: 'downloder',
   limit: true
}, __filename)     
  