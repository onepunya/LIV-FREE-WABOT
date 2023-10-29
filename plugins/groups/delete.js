neoxr.create(async (m, {
   client,
   isBotAdmin,
   Func
}) => {
   try {
      if (!m.quoted) return
      client.sendMessage(m.chat, {
         delete: {
            remoteJid: m.chat,
            fromMe: isBotAdmin ? false : true,
            id: m.quoted.id,
            participant: m.quoted.sender
         }
      })
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['del'],
   hidden: ['delete'],
   use: 'reply chat',
   category: 'group',
   admin: true,
   group: true
}, __filename)