neoxr.create(async (m, {
   client,
   args,
   setting,
   Func
}) => {
   try {
      global.db.users.filter(v => v.limit < global.limit && !v.premium).map(v => v.limit = args[0] ? args[0] : global.limit)
      global.db.users.filter(v => v.limitGame < global.limitGame && !v.premium).map(v => v.limitGame = global.limitGame)
      setting.lastReset = new Date * 1
      client.reply(m.chat, Func.texted('bold', `🚩 Successfully reset limit for user free to default.`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['reset'],
   category: 'owner',
   owner: true
}, __filename)