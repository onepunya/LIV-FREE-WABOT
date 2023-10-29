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
         const json = await Rul.bard(text) 
         if (!json.status) return m.reply(Func.jsonFormat(json))
         await client.reply(m.chat, json.results, m) 
         
         
               } catch (e) {
         console.log(e)
         client.reply(m.chat, e, m)
      }
   }, {
   usage: ['bard'],
   hidden: ['bardai'],
   use: 'text',
   category: 'aimenu',
   premium: false,
   limit: true
}, __filename)