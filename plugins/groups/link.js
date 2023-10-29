neoxr.create(async (m, {
   client,
   Func
}) => {
   try {
      await client.reply(m.chat, 'https://chat.whatsapp.com/' + (await client.groupInviteCode(m.chat)), m)
   } catch (e) {
   	m.reply(`Err tolol!`)
      // client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['link'],
   hidden: ['linkgc'],
   category: 'group',
   group: true,
   botAdmin: true
}, __filename)