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
         const json = await Anya.playmp4(text)
        let caption = `*YOUTUBE VIDEO*\n\n`
          caption += `*TITLE*: ${json.title}\n`
         caption += `*CHANNEL*: ${json.channel}\n`
         caption += `*VIEWS*: ${json.views}\n`
         caption += `*PUB*: ${json.published}\n`
         caption += global.footer   
        let thum = json.thumb      
        await client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.thumb)
            }).then(() => client.sendFile(m.chat, json.url, 'video.mp4', '🐱success ☑️', m))
           
       } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.texted('bold', e.message), m)
   }
}, {
   usage: ['playvid'],
   hidden: ['plv', 'vid', 'video'],
   use: 'query',
   category: 'downloder',
   limit: true
}, __filename)     
         