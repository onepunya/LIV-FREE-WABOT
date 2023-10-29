const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone).locale('id')
neoxr.create(async (m, {
   client,
   participants,
   Func
}) => {
   try {
      const setting = global.db.groups.find(v => v.jid == m.chat)
      let pic = await Func.fetchBuffer('./media/image/default.jpg')
      const meta = await (await client.groupMetadata(m.chat))
      const admin = await client.groupAdmin(m.chat)
      const member = participants.map(u => u.id)
      try {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(m.chat, 'image'))
      } catch {} finally {
         let caption = `乂  *G R O U P - I N F O*\n\n`
         caption += `	◦  *Name* : ${meta.subject}\n`
         caption += `	◦  *Member* : ${member.length}\n`
         caption += `	◦  *Admin* : ${admin.length}\n`
         caption += `	◦  *Created* : ${moment(meta.creation * 1000).format('DD/MM/YY HH:mm:ss')}\n`
         caption += `	◦  *Owner* : ${meta.owner ? '@' + meta.owner.split('@')[0] : m.chat.match('-') ? '@' + m.chat.split('-')[0] : '@0'}\n\n`
         caption += `乂  *M O D E R A T I O N*\n\n`
         caption += `	◦  ${Func.switcher(setting.antibot, '[ √ ]', '[ × ]')} Anti Bot\n`
         caption += `	◦  ${Func.switcher(setting.antidelete, '[ √ ]', '[ × ]')} Anti Delete\n`
         caption += `	◦  ${Func.switcher(setting.antilink, '[ √ ]', '[ × ]')} Anti Link\n`
         caption += `	◦  ${Func.switcher(setting.antiporn, '[ √ ]', '[ × ]')} Anti Porn\n`
         caption += `	◦  ${Func.switcher(setting.antivirtex, '[ √ ]', '[ × ]')} Anti Virtex\n`
         caption += `	◦  ${Func.switcher(setting.filter, '[ √ ]', '[ × ]')} Filter\n`
         caption += `	◦  ${Func.switcher(setting.left, '[ √ ]', '[ × ]')} Left Message\n`
         caption += `	◦  ${Func.switcher(setting.localonly, '[ √ ]', '[ × ]')} Localonly\n`
         caption += `	◦  ${Func.switcher(setting.simi, '[ √ ]', '[ × ]')} Simi\n`
         caption += `	◦  ${Func.switcher(setting.welcome, '[ √ ]', '[ × ]')} Welcome Message\n`
         caption += `	◦  ${Func.switcher(setting.viewonce, '[ √ ]', '[ × ]')} View Once Forwarder\n\n`
         caption += `乂  *G R O U P - S T A T U S*\n\n`
         caption += `	◦  *Muted* : ${Func.switcher(setting.mute, '√', '×')}\n`
         caption += `	◦  *Stay* : ${Func.switcher(setting.stay, '√', '×')}\n`
         caption += `	◦  *Expired* : ${setting.expired == 0 ? 'NOT SET' : Func.timeReverse(setting.expired - new Date * 1)}\n\n`
         caption += global.footer
         client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: pic,
         })
      }
   } catch (e) {
      console.log(e)
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['groupinfo'],
   hidden: ['gcinfo'],
   category: 'group',
   group: true
}, __filename)