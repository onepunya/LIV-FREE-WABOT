neoxr.create(async (m, {
   client,
   text,
   participants,
   Func
}) => {
   const member = participants.map(v => v.id)
   const readmore = String.fromCharCode(8206).repeat(4001)
   const message = (!text) ? 'Hello everyone, admin mention you in ' + await (await client.groupMetadata(m.chat)).subject + ' group.' : text
   client.sendMessageModify(m.chat, `乂  *E V E R Y O N E*\n\n*“${message}”*\n${readmore}\n${member.map(v => '◦  @' + v.replace(/@.+/, '')).join('\n')}`, m, {
      largeThumb: true,
      url: global.db.setting.link
   })
}, {
   usage: ['tagall'],
   use: 'text (optional)',
   category: 'admin',
   admin: true,
   group: true
}, __filename)