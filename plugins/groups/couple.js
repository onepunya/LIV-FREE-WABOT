const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
neoxr.create(async (m, {
   client,
   participants,
   Func
}) => {
   try {
      let member = participants.map(u => u.id)
      let now = new Date * 1
      var tag1 = member[Math.floor(member.length * Math.random())]
      var tag2 = member[Math.floor(member.length * Math.random())]
      if (tag1 == tag2) {
         for (let i = 0; i < 5; i++) {
            var tag1 = member[Math.floor(member.length * Math.random())]
            var tag2 = member[Math.floor(member.length * Math.random())]
            if (tag1 != tag2) {
               break
            }
         }
      }
      client.reply(m.chat, `Selamat untuk @${tag1.replace(/@.+/, '')} 💞 @${tag2.replace(/@.+/, '')}, Semoga langeng yaaa :>

_${moment(now).format('DD/MM/YYYY HH:mm')}._`)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['couple'],
   category: 'group',
   group: true
}, __filename)