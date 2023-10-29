const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
neoxr.create(async (m, {
   client,
   prefix,
   Func
}) => {
   try {
      let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groups = await groupList()
      let rows = []
      let caption = `乂  *G R O U P - L I S T*\n\n`
      caption += `*“Bot has joined into ${groups.length} groups, send _${prefix}gc_ or _${prefix}gcopt_ to show all setup options.”*\n\n`
      groups.map((x, i) => {
         let v = global.db.groups.find(v => v.jid == x.id)
         if (v) {
            caption += `›  *${(i + 1)}.* ${x.subject}\n`
            caption += `   *💳* : ${x.id.split`@`[0]}\n`
            caption += `${v.stay ? '   FOREVER' : (v.expired == 0 ? '   NOT SET' : '   ' + Func.timeReverse(v.expired - new Date() * 1))} | ${x.participants.length} | ${(v.mute ? 'OFF' : 'ON')} | ${moment(v.activity).format('DD/MM/YY HH:mm:ss')}\n\n`
         } else {
            global.db.groups.push({
               jid: x.id,
               activity: new Date * 1,
               antibot: true,
               antidelete: true,
               antilink: true,
               antiporn: true,
               antivirtex: true,
               filter: true,
               captcha: false,
               game: true,
               left: true,
               localonly: true,
               mute: false,
               member: {},
               text_left: '',
               text_welcome: '',
               welcome: true,
               expired: 0,
               stay: false
            })
         }
      })
      caption += `${global.footer}`
      m.reply(caption)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['groups'],
   category: 'owner',
   owner: true
}, __filename)