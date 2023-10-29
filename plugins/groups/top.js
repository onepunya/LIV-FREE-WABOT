const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
neoxr.create(async (m, {
   client,
   text,
   command,
   prefix,
   participants,
   Func
}) => {
   try {
  	if (!text) return client.reply(m.chat, Func.example(prefix, command, 'how to create an api'), m)
      let member = participants.map(u => u.id)
      let now = new Date * 1
      var point1 = Func.randomInt(90, 101)
      var point2 = Func.randomInt(80, 90)
      var point3 = Func.randomInt(70, 80)
      var point4 = Func.randomInt(60, 70)
      var point5 = Func.randomInt(50, 60)
      var point6 = Func.randomInt(40, 50)
      var point7 = Func.randomInt(30, 40)
      var point8 = Func.randomInt(20, 30)
      var point9 = Func.randomInt(10, 20)
      var point10 = Func.randomInt(0, 10)
      var tag1 = member[Math.floor(member.length * Math.random())]
      var tag2 = member[Math.floor(member.length * Math.random())]
      var tag3 = member[Math.floor(member.length * Math.random())]
      var tag4 = member[Math.floor(member.length * Math.random())]
      var tag5 = member[Math.floor(member.length * Math.random())]
      var tag6 = member[Math.floor(member.length * Math.random())]
      var tag7 = member[Math.floor(member.length * Math.random())]
      var tag8 = member[Math.floor(member.length * Math.random())]
      var tag9 = member[Math.floor(member.length * Math.random())]
      var tag10 = member[Math.floor(member.length * Math.random())]
      if (tag1 == tag2 == tag3 == tag4 == tag5 == tag6 == tag7 == tag8 == tag9 == tag10) {
         for (let i = 0; i < 5; i++) {
            var tag1 = member[Math.floor(member.length * Math.random())]
      var tag2 = member[Math.floor(member.length * Math.random())]
      var tag3 = member[Math.floor(member.length * Math.random())]
      var tag4 = member[Math.floor(member.length * Math.random())]
      var tag5 = member[Math.floor(member.length * Math.random())]
      var tag6 = member[Math.floor(member.length * Math.random())]
      var tag7 = member[Math.floor(member.length * Math.random())]
      var tag8 = member[Math.floor(member.length * Math.random())]
      var tag9 = member[Math.floor(member.length * Math.random())]
      var tag10 = member[Math.floor(member.length * Math.random())]
            if (tag1 != tag2 != tag3 != tag4 != tag5 != tag6 != tag7 != tag8 != tag9 != tag10) {
               break
            }
         }
      }
      let capt = `*Top 10 ${text}*\n`
      capt += `*Tanggal*: _${moment(now).format('DD/MM/YYYY HH:mm')}._\n\n`
      capt += `1. *@${tag1.replace(/@.+/, '')}* ${point1}%\n`
      capt += `2. *@${tag2.replace(/@.+/, '')}* ${point2}%\n`
      capt += `3. *@${tag3.replace(/@.+/, '')}* ${point3}%\n`
      capt += `4. *@${tag4.replace(/@.+/, '')}* ${point4}%\n`
      capt += `5. *@${tag5.replace(/@.+/, '')}* ${point5}%\n`
      capt += `6. *@${tag6.replace(/@.+/, '')}* ${point6}%\n`
      capt += `7. *@${tag7.replace(/@.+/, '')}* ${point7}%\n`
      capt += `8. *@${tag8.replace(/@.+/, '')}* ${point8}%\n`
      capt += `9. *@${tag9.replace(/@.+/, '')}* ${point9}%\n`
      capt += `10. *@${tag10.replace(/@.+/, '')}* ${point10}%\n`
      client.reply(m.chat, capt)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['top'],
   category: 'group',
   group: true
}, __filename)