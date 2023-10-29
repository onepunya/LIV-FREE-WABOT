neoxr.create(async (m, {
   client,
   text,
   args,
   prefix,
   command,
   participants,
   Func
}) => {
   try {
      let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
      if (!input) return client.reply(m.chat, Func.texted('bold', `🚩 Mention or reply chat target.`), m)
      let p = await client.onWhatsApp(input.trim())
      if (p.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Invalid number.`), m)
      let jid = client.decodeJid(p[0].jid)
      let number = jid.replace(/@.+/, '')
      if (command == '+owner') { // add owner number
         let owners = global.db.setting.owners
         if (owners.includes(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Target is already the owner.`), m)
         owners.push(number)
         client.reply(m.chat, Func.texted('bold', `🚩 Successfully added @${number} as owner.`), m)
      } else if (command == '-owner') { // remove owner number
         let owners = global.db.setting.owners
         if (!owners.includes(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Target is not owner.`), m)
         owners.forEach((data, index) => {
            if (data === number) owners.splice(index, 1)
         })
         client.reply(m.chat, Func.texted('bold', `🚩 Successfully removing @${number} from owner list.`), m)
      } else if (command == '+prem') { // add premium
         let data = global.db.users.find(v => v.jid == jid)
         if (typeof data == 'undefined') return client.reply(m.chat, Func.texted('bold', `🚩 Can't find user data.`), m)
         if (data.premium) return client.reply(m.chat, Func.texted('bold', `🚩 @${jid.replace(/@.+/, '')} has become registered as a premium account.`), m)
         data.limit += 1000
         data.expired += data.premium ? (86400000 * 30) : ((new Date() * 1) + (86400000 * 30))
         client.reply(m.chat, data.premium ? Func.texted('bold', `🚩 Succesfully added 30 days premium access for @${jid.replace(/@.+/, '')}.`) : Func.texted('bold', `🚩 Successfully added @${jid.replace(/@.+/, '')} to premium user.`), m).then(() => data.premium = true)
      } else if (command == '-prem') { // remove premium
         let data = global.db.users.find(v => v.jid == jid)
         if (typeof data == 'undefined') return client.reply(m.chat, Func.texted('bold', `🚩 Can't find user data.`), m)
         if (!data.premium) return client.reply(m.chat, Func.texted('bold', `🚩 Not a premium account.`), m)
         data.limit = global.limit
         data.premium = false
         data.expired = 0
         client.reply(m.chat, Func.texted('bold', `🚩 @${jid.replace(/@.+/, '')}'s premium status has been successfully deleted.`), m)
      } else if (command == 'ban') { // banned user
         let is_user = global.db.users
         let is_owner = [client.decodeJid(client.user.id).split`@` [0], global.owner, ...global.db.setting.owners].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(jid)
         if (!is_user.some(v => v.jid == jid)) return client.reply(m.chat, Func.texted('bold', `🚩 User data not found.`), m)
         if (is_owner) return client.reply(m.chat, Func.texted('bold', `🚩 Can't banned owner number.`), m)
         if (jid == client.decodeJid(client.user.id)) return client.reply(m.chat, Func.texted('bold', `🚩 ??`), m)
         if (is_user.find(v => v.jid == jid).banned) return client.reply(m.chat, Func.texted('bold', `🚩 Target already banned.`), m)
         is_user.find(v => v.jid == jid).banned = true
         let banned = is_user.filter(v => v.banned).length
         client.reply(m.chat, `乂  *B A N N E D*\n\n*“Successfully added @${jid.split`@`[0]} into banned list.”*\n\n*Total : ${banned}*`, m)
      } else if (command == 'unban') { // unbanned user
         let is_user = global.db.users
         if (!is_user.some(v => v.jid == jid)) return client.reply(m.chat, Func.texted('bold', `🚩 User data not found.`), m)
         if (!is_user.find(v => v.jid == jid).banned) return client.reply(m.chat, Func.texted('bold', `🚩 Target not banned.`), m)
         is_user.find(v => v.jid == jid).banned = false
         let banned = is_user.filter(v => v.banned).length
         client.reply(m.chat, `乂  *U N B A N N E D*\n\n*“Succesfully removing @${jid.split`@`[0]} from banned list.”*\n\n*Total : ${banned}*`, m)
      } else if (command == 'block') { // block user
         if (jid == client.decodeJid(client.user.id)) return client.reply(m.chat, Func.texted('bold', `🚩 ??`), m)
         client.updateBlockStatus(jid, 'block').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'unblock') { // unblock user
         client.updateBlockStatus(jid, 'unblock').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == '+receiver') { // add receiver number
         let receiver = global.db.setting.receiver
         if (receiver.includes(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Target is already in receiver list.`), m)
         receiver.push(number)
         client.reply(m.chat, Func.texted('bold', `🚩 Succesfully added @${number} receiver list.`), m)
      } else if (command == '-receiver') { // remove receiver number
         let receiver = global.db.setting.receiver
         if (!receiver.includes(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Target is not receiver.`), m)
         receiver.forEach((data, index) => {
            if (data === number) receiver.splice(index, 1)
         })
         client.reply(m.chat, Func.texted('bold', `🚩 Successfully removing @${number} from receiver list.`), m)
      } else if (command == '+toxic') {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'fuck'), m)
            if (global.db.setting.toxic.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 '${args[0]}' already in the database.`), m)
            global.db.setting.toxic.push(args[0])
            global.db.setting.toxic.sort(function(a, b) {
               if (a < b) {
                  return -1;
               }
               if (a > b) {
                  return 1;
               }
               return 0
            })
            client.reply(m.chat, Func.texted('bold', `🚩 '${args[0]}' added successfully!`), m)
         } else if (command == '-toxic') {
            if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'fuck'), m)
            if (global.db.setting.toxic.length < 2) return client.reply(m.chat, Func.texted('bold', `🚩 Sorry, you can't remove more.`), m)
            if (!global.db.setting.toxic.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 '${args[0]}' not in database.`), m)
            global.db.setting.toxic.forEach((data, index) => {
               if (data === args[0]) global.db.setting.toxic.splice(index, 1)
            })
            client.reply(m.chat, Func.texted('bold', `🚩 '${args[0]}' has been removed.`), m)
         }
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['+receiver', '-receiver', '+owner', '-owner', '+prem', '-prem', 'ban', 'unban', 'block', 'unblock', '+toxic', '-toxic'],
   use: 'mention or reply',
   category: 'owner',
   owner: true
}, __filename)