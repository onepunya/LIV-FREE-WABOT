neoxr.create(async (m, {
   client,
   text,
   participants,
   Func
}) => {
   const users = participants.map(u => u.id)
   await client.reply(m.chat, text, null, {
      mentions: users
   })
}, {
   usage: ['hidetag'],
   use: 'text',
   category: 'admin',
   admin: true,
   group: true
}, __filename)