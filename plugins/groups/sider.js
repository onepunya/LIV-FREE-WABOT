neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   groupSet,
   participants,
   isAdmin,
   isBotAdmin,
   Func
}) => {
   try {
      const member = participants.filter(v => v.admin == null).map(v => v.id).filter(v => v != client.decodeJid(client.user.id))
      var day = 86400000 * 7, // 7 days
         now = new Date() * 1
      var siderByLastSeen = [],
         siderByNoRecord = []
      member.map(v => {
         if (groupSet.member[v] && !groupSet.member[v].premium && groupSet.member[v].lastseen && (now - groupSet.member[v].lastseen > day)) siderByLastSeen.push({
            jid: v,
            ...groupSet.member[v]
         })
      })
      member.map(v => {
         if (!groupSet.member[v]) siderByNoRecord.push(v)
      })
      if (args && args[0] == '-y') {
         if (!isAdmin) return client.reply(m.chat, global.status.admin, m)
         if (!isBotAdmin) return client.reply(m.chat, global.status.botAdmin, m)
         const sider = siderByLastSeen.map(v => v.jid).concat(siderByNoRecord)
         if (sider.length < 1) return client.reply(m.chat, Func.texted('bold', `🚩 There is no silent member in this group.`), m)
         for (let jid of sider) {
            await Func.delay(2000)
            await client.groupParticipantsUpdate(m.chat, [jid], 'remove')
         }
         await client.reply(m.chat, Func.texted('bold', `🚩 Done, ${sider.length} silent member successfully removed.`), m)
      } else {
         const sider = siderByLastSeen.map(v => v.jid).concat(siderByNoRecord)
         if (sider.length < 1) return client.reply(m.chat, Func.texted('bold', `🚩 There is no silent member in this group.`), m)
         let teks = `乂  *S I D E R*\n\n`
         teks += siderByNoRecord.length < 1 ? '' : `“There are *${siderByNoRecord.length}* members of the group who did not send any chats.”\n\n`
         teks += siderByNoRecord.length < 1 ? '' : siderByNoRecord.map(v => '	◦  @' + v.replace(/@.+/, '')).join('\n')
         teks += siderByNoRecord.length < 1 ? '' : '\n\n'
         teks += siderByLastSeen.length < 1 ? '' : `“There are *${siderByLastSeen.length}* group members who are not online for 1 week.”\n\n`
         teks += siderByLastSeen.length < 1 ? '' : siderByLastSeen.sort((a, b) => a.lastseen - b.lastseen).map(v => '	◦  @' + v.jid.replace(/@.+/, '') + '\n	     *Lastseen* : ' + Func.toDate(now - v.lastseen).split('D')[0] + ' days ago').join('\n')
         teks += siderByLastSeen.length < 1 ? '' : '\n\n'
         teks += `*Note* : This feature will be accurate when the bot has been in the group for 1 week, send *${prefix + command} -y* to remove them.`
         teks += `\n\n${global.footer}`
         client.reply(m.chat, teks, m)
      }
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['sider'],
   category: 'group',
   group: true
}, __filename)