//fitur yg di tambahkan hanya di bot @Liv oleh mr.one

const axios = require("axios")
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
      
               let ja = Func.random(['😋', '😮‍💨', '😙', '😘', '☺', '😛', '🤨', '😁'])
               
               
      	  client.sendProgress(m.chat, ja, m)
      } catch (e) {
         console.log(e)
         client.reply(m.chat, e, m)
      }
   }, {
   usage: ['l','wait','loadtes'],
   use: 'testing loading',
   category: 'owner',
   owner: false
}, __filename)