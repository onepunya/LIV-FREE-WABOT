const { execSync } = require('child_process')
neoxr.create(async (m, {
   client,
   Func
}) => {
   try {
      var stdout = execSync('git pull')
      var output = stdout.toString()
      if (output.match(new RegExp('Already up to date', 'g'))) return client.reply(m.chat, Func.texted('bold', `🚩 ${output.trim()}`), m)
      if (output.match(/stash/g)) {
         var stdout = execSync('git stash && git pull')
         var output = stdout.toString()
         client.reply(m.chat, `🚩 ${output.trim()}`, m).then(async () => process.send('reset'))
      } else return client.reply(m.chat, `🚩 ${output.trim()}`, m).then(async () => process.send('reset'))
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['update'],
   category: 'owner',
   owner: true
}, __filename)