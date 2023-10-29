neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func
}) => {
   try {
      let setup = global.db.groups.find(v => v.jid == m.chat)
      if (command == 'setwelcome') {
         if (!text) return client.reply(m.chat, formatWel(prefix, command), m)
         setup.text_welcome = text
         await client.reply(m.chat, Func.texted('bold', `🚩 Successfully set.`), m)
      } else if (/set(out|left)/i.test(command)) {
         if (!text) return client.reply(m.chat, formatLef(prefix, command), m)
         setup.text_left = text
         await client.reply(m.chat, Func.texted('bold', `🚩 Successfully set.`), m)
      }
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setwelcome', 'setleft'],
   use: 'text',
   category: 'admin',
   admin: true,
   group: true
}, __filename)

const formatWel = (prefix, command) => {
   return `Sorry, can't return without text, and this explanation and how to use :

*1.* +tag : for mention new member on welcome message.
*2.* +grup : for getting group name.

• *Example* : ${prefix + command} Hi +tag, welcome to +grup group, we hope you enjoyed with us.`
}

const formatLef = (prefix, command) => {
   return `Sorry, can't return without text, and this explanation and how to use :

*1.* +tag : for mention new member on left message.
*2.* +grup : for getting group name.

• *Example* : ${prefix + command} Good by +tag`
}