const { writeFileSync: create, readFileSync: read }= require('fs')
const { MongoDB } = new(require('@lanbott/lanbot-js'))
const stable = require('json-stable-stringify')
const machine = process.env.DATABASE_URL ? MongoDB : new(require('lib/system/localdb'))(global.database)
neoxr.create(async (m, {
   client,
   Func
}) => {
   try {
      await machine.save(global.db)
      create('./' + global.database + '.json', stable(global.db), 'utf-8')
      client.sendReact(m.chat, '🕒', m.key)
      await client.sendFile(m.chat, read('./' + global.database + '.json'), global.database + '.json', '', m)
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['backup'],
   category: 'owner',
   owner: true
}, __filename)