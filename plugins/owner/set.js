const FormData = require('form-data')
const fs = require('fs')
//=================[lol]==================//
// Set Cover
neoxr.create(async (m, {
   client,
   Func,
   Scraper
}) => {
   try {
      let setting = global.db.setting
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!/image/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Image not found.`), m)
      client.sendReact(m.chat, '🕒', m.key)
      let img = await q.download()
      if (!img) return client.reply(m.chat, global.status.wrong, m)
      let json = await Scraper.uploadImage(img)
      if (!json.status) return m.reply(Func.jsonFormat(json))
      setting.cover = json.data.url
      client.reply(m.chat, Func.texted('bold', `🚩 Cover successfully set.`), m)
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setcover'],
   hidden: ['cover'],
   use: 'reply foto',
   category: 'owner',
   owner: true
}, __filename)

// Set Watermark (Sticker)
neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func
}) => {
   try {
      let setting = global.db.setting
      if (!text) return client.reply(m.chat, Func.example(prefix, command, 'Sticker by | @Dellas'), m)
      let [packname, ...author] = text.split`|`
      author = (author || []).join`|`
      setting.sk_pack = packname || ''
      setting.sk_author = author || ''
      client.reply(m.chat, Func.texted('bold', `🚩 Sticker Watermark successfully set.`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setwm'],
   use: 'packname | author',
   category: 'owner',
   owner: true
}, __filename)

// Set Menu
neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   Func
}) => {
   try {
      let setting = global.db.setting
      if (!args || !args[0]) {
         let rows = [{
            title: `STYLE 1`,
            rowId: `${prefix + command} 1`,
            description: ''
         }, {
            title: `STYLE 2`,
            rowId: `${prefix + command} 2`,
            description: ''
         }, {
            title: `STYLE 3`,
            rowId: `${prefix + command} 3`,
            description: ''
         }, {
            title: `STYLE 4`,
            rowId: `${prefix + command} 4`,
            description: ''
         }]
         client.sendList(m.chat, '', `Choose menu style. 🍟`, '', 'Tap!', [{
            rows
         }], m)
      } else return client.reply(m.chat, `🚩 Bot menu successfully set using style *${args[0]}*.`, m).then(() => setting.menuStyle = parseInt(args[0]))
   } catch (e) {
      console.log(e)
      return client.reply(m.chat, global.status.error, m)
   }
}, {
   usage: ['setmenu'],
   use: '(option)',
   category: 'owner',
   owner: true
}, __filename)

// Set Link
neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   Func
}) => {
   try {
      let setting = global.db.setting
      if (!args || !args[0]) return client.reply(m.chat, Func.example(prefix, command, setting.link), m)
      setting.link = args[0]
      client.reply(m.chat, Func.texted('bold', `🚩 Link successfully set.`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setlink'],
   use: 'link',
   category: 'owner',
   owner: true
}, __filename)


// Set Header Message
neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func
}) => {
   try {
      let setting = global.db.setting
      if (!text) return client.reply(m.chat, explain(prefix, command), m)
      setting.msg = text
      client.reply(m.chat, Func.texted('bold', `🚩 Menu Message successfully set.`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setmsg'],
   use: 'text',
   category: 'owner',
   owner: true
}, __filename)

const explain = (prefix, command) => {
   return `Sorry, can't return without text, and this explanation and how to use :

*1.* +tag : for mention sender.
*2.* +name : to getting sender name.
*3.* +greeting : to display greetings by time.
*4.* +db : to display the database in use.
*5.* +version : to get baileys version in use.

• *Example* : ${prefix + command} Hi +tag +greeting, i'm an automation system`
}

// Set pp
neoxr.create(async (m, {
   client,
   Func,
   Scraper
}) => {
   try {
      let q = m.quoted ? m.quoted : m
      let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
      if (/image\/(jpe?g|png)/.test(mime)) {
         client.sendReact(m.chat, '🕒', m.key)
         const buffer = await q.download()
         const image = await fs.writeFileSync("./temp/pp.png", buffer);
         await client.updateProfilePicture(client.user.id, {
            url: './temp/pp.png'
         })
         await Func.delay(3000).then(() => client.reply(m.chat, Func.texted('bold', `🚩 Profile photo has been successfully changed.`), m))
         await Func.delay(4000).then(() => fs.unlinkSync("./temp/pp.png"))
      } else return client.reply(m.chat, Func.texted('bold', `🚩 Reply to the photo that will be made into the bot's profile photo.`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setpp'],
   hidden: ['pp'],
   use: 'reply foto',
   category: 'owner',
   owner: true
}, __filename)
 
neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func,
   Scraper
}) => {
   try {
      let setting = global.db.setting
      if (!text) return client.reply(m.chat, Func.example(prefix, command, 'openpose_full'), m)
      setting.module = text
      client.reply(m.chat, Func.Styles(`Done set ${text}`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setmodule'],
   use: 'text',
   category: 'owner',
   owner: true
}, __filename)

neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func,
   Scraper
}) => {
   try {
      let setting = global.db.setting
      if (!text) return client.reply(m.chat, Func.example(prefix, command, '512'), m)
      setting.height = text
      client.reply(m.chat, Func.Styles(`Done set ${text}`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setheight'],
   use: 'text',
   category: 'owner',
   owner: true
}, __filename)

neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Func,
   Scraper
}) => {
   try {
      let setting = global.db.setting
      if (!text) return client.reply(m.chat, Func.example(prefix, command, '512'), m)
      setting.width = text
      client.reply(m.chat, Func.Styles(`Done set ${text}`), m)
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['setwidth'],
   use: 'text',
   category: 'owner',
   owner: true
}, __filename)