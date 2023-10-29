neoxr.create(async (m, {
      client,
      chats,
      command,
      prefix,
      text,
      Func,
      Scraper
   }) => {
      try { 
      	  if (!m.quoted && !text) return client.reply(m.chat, Func.example(prefix, command, 'how to create an api'), m)
         if (m.quoted && !/conversation|extend/.test(m.quoted.mtype)) return m.reply(Func.texted('bold', `ðŸš© Text not found!`))
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Znr.cai2(text, 'anto')
         if (!json.status) return m.reply(Func.jsonFormat(json))
         await client.reply(m.chat, json.message, m) 
         
         
               } catch (e) {
         console.log(e)
         client.reply(m.chat, e, m)
      }
   }, {
   usage: ['cai'],
   hidden: ['cgpt'],
   use: 'text',
   category: 'aimenu',
   premium: false,
   limit: true
}, __filename)