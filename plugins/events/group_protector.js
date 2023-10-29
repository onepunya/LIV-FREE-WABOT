neoxr.create(async (m, {
   client,
   body,
   users,
   isOwner,
   isAdmin,
   isBotAdmin,
   groupSet,
   setting,
   Func
}) => {
   try {
      // Anti Link
      if (groupSet.antilink && !isAdmin && body) {
         if (body.match(/(chat.whatsapp.com|wa.me)/gi) && !body.includes(await client.groupInviteCode(m.chat))) return client.sendMessage(m.chat, {
            delete: {
               remoteJid: m.chat,
               fromMe: false,
               id: m.key.id,
               participant: m.sender
            }
         }).then(() => client.groupParticipantsUpdate(m.chat, [m.sender], 'remove'))
      }
      
      // Anti Tagall / Hidetag
      if (!isOwner && !isAdmin && !m.isBot && m.mentionedJid.length > 10) return client.groupParticipantsUpdate(m.chat, [m.sender], 'remove')

      // Anti Virtex
      if (!m.fromMe && body && (groupSet.antivirtex && body.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื)/gi) || groupSet.antivirtex && body.length > 10000)) return client.sendMessage(m.chat, {
         delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.sender
         }
      }).then(() => client.groupParticipantsUpdate(m.chat, [m.sender], 'remove'))
     
               room.wrong += 1
               if (room.wrong >= 3) return await client.reply(room.groupId, Func.texted('bold', `❌ [ 3 / 3 ] your chance is up, goodbye . . .`), m).then(async () => {
                  await Func.delay(1500)
                  client.groupParticipantsUpdate(room.groupId, [room.to], 'remove')
                  clearTimeout(room.timeout)
                  delete global.db.captcha[room.to]
               })
               return client.reply(room.groupId, `❌ Incorrect captcha code, you have *${3 - room.wrong}* more chances.`, m)
            
         
      

      // Anti Toxic (Filter)
      if (groupSet.filter && !isAdmin && isBotAdmin && !m.fromMe && !users.premium) {
         let toxic = setting.toxic
         if (body && (new RegExp('\\b' + toxic.join('\\b|\\b') + '\\b')).test(body.toLowerCase())) {
            groupSet.member[m.sender].warning += 1
            let warning = groupSet.member[m.sender].warning
            if (warning > 4) return client.reply(m.chat, Func.texted('bold', `🚩 Warning : [ 5 / 5 ], good bye ~~`), m).then(() => {
               client.groupParticipantsUpdate(m.chat, [m.sender], 'remove').then(async () => {
                  groupSet.member[m.sender].warning = 0
                  client.sendMessage(m.chat, {
                     delete: {
                        remoteJid: m.chat,
                        fromMe: isBotAdmin ? false : true,
                        id: m.key.id,
                        participant: m.sender
                     }
                  })
               })
            })
            return client.reply(m.chat, `乂  *W A R N I N G* \n\nYou got warning : [ ${warning} / 5 ]\n\If you get 5 warnings you will be kicked automatically from the group.`, m).then(() => client.sendMessage(m.chat, { audio: { url: 'https://dl.sndup.net/k565/Gaboleh%20gitu.mp3' }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,3,58,44,35,32,2,4,31,35,44,34,48,13,0,54,49,40,1,44,50,51,16,0,3,40,39,46,3,42,38,44,46,0,0,47,0,0,46,19,20,48,43,49,0,0,39,40,31,18,29,17,25,37,51,22,37,34,19,11,17,12,16,19] }, { quoted: m }).then(() => client.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: isBotAdmin ? false : true,
                  id: m.key.id,
                  participant: m.sender
               }
            })))
         }
      }
   } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   group: true,
   botAdmin: true
}, __filename)