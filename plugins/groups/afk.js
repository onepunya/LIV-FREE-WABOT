neoxr.create(async (m, {
   client,
   text,
   users,
   Func
}) => {
   try {
      users.afk = +new Date
      users.afkReason = text
      users.afkObj = m
      let tag = m.sender.split`@` [0]
      return client.reply(m.chat, Func.texted('bold', `🚩 @${tag} is now AFK!`), m)
   } catch {
      client.reply(m.chat, global.status.error, m)
   }
}, {
   usage: ['afk'],
   use: 'reason (optional)',
   category: 'group',
   group: true
}, __filename) 