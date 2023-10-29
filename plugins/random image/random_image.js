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
   if (command == 'cosplay') {
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Anya.cosplay(text)
        let ol = await Func.fetchBuffer(json)
          await client.sendFile(m.chat, ol, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
 
         } else 
            if (command == 'nezuko', 
'rize', 
'anna', 
'deidara', 
'yuki', 
'anna', 
'asuna', 
'ayuzawa', 
'chitoge', 
'emilia', 
'hestia', 
'inori', 
'itachi', 
'madara', 
'sakura', 
'Sasuke', 
'tsunade', 
'one piece', 
'mobil', 
'montor', 
'boneka chucky', 
'keneki', 
'megumin', 
'toukachan', 
'akira', 
'itori', 
'kurumi', 
'miku', 
'pokemon', 
'wibu', 
'waifu', 
'waifu2', 
'shota', 
'loli', 
'yotsuba', 
'shinomiya', 
'yumeko', 
'tejina', 
'chiho', 
'boruto', 
'kaori', 
'shizuka', 
'kaga', 
'kotori', 
'mikasa', 
'akiyama', 
'gremory', 
'isuzu', 
'shina', 
'kagura', 
'shinka', 
'eba', 
'elaina', 
'yuri', 
'erza', 
'hinata', 
'minato', 
'naruto') { 
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Anya.img(command)
        let mu = await Func.fetchBuffer(json)
          await client.sendFile(m.chat, mu, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
         

}  
} catch (e) {
      return client.reply(m.chat, 'maaf effect yang kamu masukan tidak ada/eror ', m)
      }
  }, {
   usage: ['cosplay', 'nezuko', 
'rize', 
'anna', 
'deidara', 
'yuki', 
'anna', 
'asuna', 
'ayuzawa', 
'chitoge', 
'emilia', 
'hestia', 
'inori', 
'itachi', 
'madara', 
'sakura', 
'Sasuke', 
'tsunade', 
'one piece', 
'mobil', 
'montor', 
'boneka chucky', 
'keneki', 
'megumin', 
'toukachan', 
'akira', 
'itori', 
'kurumi', 
'miku', 
'pokemon', 
'wibu', 
'waifu', 
'waifu2', 
'shota', 
'loli', 
'yotsuba', 
'shinomiya', 
'yumeko', 
'tejina', 
'chiho', 
'boruto', 
'kaori', 
'shizuka', 
'kaga', 
'kotori', 
'mikasa', 
'akiyama', 
'gremory', 
'isuzu', 
'shina', 
'kagura', 
'shinka', 
'eba', 
'elaina', 
'yuri', 
'erza', 
'hinata', 
'minato', 'naruto'],
   category: 'random image',
   premium: false,
   limit: true
}, __filename)           