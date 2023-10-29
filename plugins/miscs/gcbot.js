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
   usage: ['gcbot'],
hidden: ['gcbot'], 
     category: 'miscs'
}, __filename)

const sell = (prefix) => {
   return `*GROUP BOT*
silahkan masuk ke group resmi bot Liv

•linkgroup = https://chat.whatsapp.com/FRL4FzReE0X4qf8Yy80RkW

•linkmicroweb = https://s.id/zavodmd

atau hubungi owner dengan ketik /owner`

}