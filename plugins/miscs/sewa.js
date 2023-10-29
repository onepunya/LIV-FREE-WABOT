neoxr.create(async (m, {
   client,
   prefix,
   Func
}) => {
   try {
      client.sendMessageModify(m.chat, sell(prefix), m, {
         ads: false,
         largeThumb: true,
         thumbnail: 'https://iili.io/JJVxCas.jpg', 
         url: global.db.setting.link
      })
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['sewa'],
hidden: ['sewa'], 
     category: 'miscs'
}, __filename)

const sell = (prefix) => {
   return `_Open sewa bot_
*sᴇᴡᴀ ɢʀᴏᴜᴘ*
•5k 15d
•10k 30d
*sᴇᴡᴀ.ɢ + ᴘʀᴇᴍɪᴜᴍ*
•10k 15d + ᴘʀᴇᴍɪᴜᴍ(30d) 
•15k 30d+ premium(30d) 

*ᴘʀᴇᴍɪᴜᴍ ᴏɴʟʏ*
•5k 30d 

mau? silahkan hubungi! 
_ owner_ wa.me/6289602518223`

}