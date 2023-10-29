neoxr.create(async (m, {
   client,
   Func
}) => {
   try {
      return client.groupParticipantsUpdate(m.chat, [m.sender], 'promote').then(()=> client.reply(m.chat, Func.texted('bold', `🚩 successfully make your to admin.`), m))
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   hidden: ['admin'],
   category: 'owner',
   owner: true
}, __filename)