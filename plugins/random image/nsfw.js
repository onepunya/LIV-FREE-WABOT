const moment = require('moment-timezone')
moment.locale('en')
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
      if (command == 'ahegao', 
'ass', 
'bdsm', 
'blowjob', 
'cuckold', 
'cum', 
'ero', 
'femdom', 
'foot', 
'gangbanh', 
'glasses', 
'hentai', 
'gifs', 
'jahy', 
'manga', 
'mstb', 
'neko', 
'orgy', 
'panties', 
'pussy', 
'neko2', 
'tentacles', 
'things', 
'yuri', 
'zettai') {
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Anya.nsfw(command)
        let ol = await Func.fetchBuffer(json)
          await client.sendFile(m.chat, ol, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
 
         } 
         
         }  catch (e) {
      return client.reply(m.chat, 'maaf effect yang kamu masukan tidak ada/eror ', m)
      }
  }, {
   usage: ['ahegao', 
'ass', 
'bdsm', 
'blowjob', 
'cuckold', 
'cum', 
'ero', 
'femdom', 
'foot', 
'gangbanh', 
'glasses', 
'hentai', 
'gifs', 
'jahy', 
'manga', 
'mstb', 
'neko', 
'orgy', 
'panties', 
'pussy', 
'neko2', 
'tentacles', 
'things', 
'yuri', 
'zettai'],
   category: 'nsfw',
   premium: false,
   limit: true
}, __filename)  

  ﻿

