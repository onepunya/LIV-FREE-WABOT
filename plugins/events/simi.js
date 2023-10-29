const canvacord = require('canvacord')
const knights = require("knights-canvas");
const fs = require('fs')
neoxr.create(async (m, {
   client,
   body,
   text,
   isOwner,
   isAdmin,
   isBotAdmin,
   participants,
   users,
   groupSet,
   setting,
   store,
   Func,
   Scraper
}) => {
   try {
         setInterval(async () => {
         let day = 86400000 * 14,
            now = new Date() * 1
         global.db.users.filter(v => now - v.lastseen > day && !v.premium && !v.banned && v.point < 1000000).map(v => {
            let user = global.db.users.find(x => x.jid == v.jid)
            if (user) Func.removeItem(global.db.users, user)
         })
         global.db.chats.filter(v => now - v.lastseen > day).map(v => {
            let chat = global.db.chats.find(x => x.jid == v.jid)
            if (chat) Func.removeItem(global.db.chats, chat)
         })
         global.db.groups.filter(v => now - v.lastseen > day).map(v => {
            let group = global.db.groups.find(x => x.jid == v.jid)
            if (group) Func.removeItem(global.db.groups, group)
         })
         global.db.setting.quizset.filter(v => now - v.created_at > day).map(v => {
            let quizset = global.db.setting.quizset.find(x => x._id == v._id)
            if (quizset) Func.removeItem(global.db.setting.quizset, quizset)
         })
      }, 60_000)
          if (!m.fromMe && !m.isBot && m.isGroup && groupSet.simi && body && !global.evaluate_chars.some(v => body.startsWith(v))) {
          let simi = await Func.removeEmojis(body)
       let mess = await Znr.simi(simi)
       client.reply(m.chat, mess.result.message, m)
       }       
   } catch (e) {
      console.log(e)
      //return client.reply(m.chat, Func.jsonFormat(e), m)
   }
   }, 
   {
   error: false
}, __filename)