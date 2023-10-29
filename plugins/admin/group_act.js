neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   Func
}) => {
   try {
      if (!args || !args[0]) return client.reply(m.chat, Func.texted('bold', `🚩 Enter argument close or open.`), m)
      if (args[0] == 'open') {
         await client.groupSettingUpdate(m.chat, 'not_announcement')
      } else if (args[0] == 'close') {
         await client.groupSettingUpdate(m.chat, 'announcement')
      }
   } catch {
      client.reply(m.chat, global.status.error, m)
   }
}, {
   usage: ['group'],
   use: 'close / open',
   category: 'admin',
   admin: true,
   botAdmin: true,
   group: true
}, __filename)