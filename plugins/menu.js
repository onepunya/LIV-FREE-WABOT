const { Converter } = new(require('@lanbott/lanbot-js'))
const { readFileSync: read, unlinkSync: remove, writeFileSync: create } = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { tmpdir } = require('os')
const axios = require('axios')
const fs = require('fs')
const readmore = String.fromCharCode(8206).repeat(4001)
neoxr.create(async (m, {
   chats,
   command,
   Scraper, 
   client,
   text,
   prefix,
   Func
}) => {
   try {
      client.menu = client.menu ? client.menu : {}
      const id = m.chat
      const plugins = neoxr.plugins.filter(v => !global.db.setting.pluginDisable.includes(v.pluginName))
      const data = global.db.setting.error  
      const local_size = fs.existsSync('./' + global.database + '.json') ? await Func.getSize(fs.statSync('./' + global.database + '.json').size) : ''
      const library = JSON.parse(require('fs').readFileSync('./package.json', 'utf-8'))
      const message = global.db.setting.msg.replace('+tag', `@${m.sender.replace(/@.+/g, '')}`).replace('+name', m.pushName).replace('+greeting', Func.greeting()).replace('+db', (process.env.DATABASE_URL ? 'Mongo' : `Local (${local_size})`)).replace('+version', (library.dependencies.bails ? library.dependencies.bails : library.dependencies['@adiwajshing/baileys'] ? '@adiwajshing/baileys' : library.dependencies.baileys).replace('^', '').replace('~', ''))
      const style = global.db.setting.menuStyle
      if (style == 1) {
         if (text) {
            let cmd = plugins.filter(v => v.usage && v.category == text.toLowerCase())
            if (cmd.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Category not available.`), m)

            let commands = []
            cmd.map(v => {
               switch (v.usage.constructor.name) {
                  case 'Array':
                     v.usage.map(x => commands.push({
                        usage: x,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     }))
                     break
                  case 'String':
                     commands.push({
                        usage: v.usage,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     })
               }
            })
            const print = commands.sort((a, b) => a.usage.localeCompare(b.usage)).map(v => `◦  ${prefix + v.usage} ${v.use}`).join('\n')
            return m.reply(Func.Styles(print))
         } else {
            let cmd = plugins.filter(v => v.usage && v.category)
            let category = []
            for (let obj of cmd) {
               if (!obj.category) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            let rows = []
            const keys = Object.keys(category).sort()
            for (let k of keys) {
               rows.push({
                  title: k.toUpperCase(),
                  rowId: `${prefix}menutype ${k}`,
                  description: ``
               })
            }
            client.sendList(m.chat, '', message, global.botname, 'Tap!', [{
               rows
            }], m)
         }
      } else if (style == 2) {
         let cmd = plugins.filter(v => v.usage && v.category)
         let category = []
         for (let obj of cmd) {
            if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
            else {
               category[obj.category] = []
               category[obj.category].push(obj)
            }
         }
         const keys = Object.keys(category).sort()
         let print = message
         print += '\n' + String.fromCharCode(8206).repeat(4001)
         for (let k of keys) {
            print += '\n\n乂  *' + k.toUpperCase().split('').map(v => v).join(' ') + '*\n\n'
            let cmd = plugins.filter(v => v.usage && v.category == k.toLowerCase())
            if (cmd.length == 0) return
            let commands = []
            cmd.map(v => {
               switch (v.usage.constructor.name) {
                  case 'Array':
                     v.usage.map(x => commands.push({
                        usage: x,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     }))
                     break
                  case 'String':
                     commands.push({
                        usage: v.usage,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     })
               }
            })
            print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map(v => `	◦  ${prefix + v.usage} ${v.use}`).join('\n')
         }
         client.menu[id] = [
            await client.sendMessageModify(m.chat, print + '\n\n' + global.footer, m, {
               ads: false,
               largeThumb: true,
               url: global.db.setting.link
            }),
            setTimeout(() => {
               delete client.menu[id]
            }, 180000)
         ]
      } else if (style == 3) {
         if (text) {
            let cmd = plugins.filter(v => v.usage && v.category == text.toLowerCase())
            if (cmd.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Category not available.`), m)
            let commands = []
            cmd.map(v => {
               switch (v.usage.constructor.name) {
                  case 'Array':
                     v.usage.map(x => commands.push({
                        usage: x,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     }))
                     break
                  case 'String':
                     commands.push({
                        usage: v.usage,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     })
               }
            })
            const print = commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
               if (i == 0) {
                  return `┌  ◦  ${prefix + v.usage} ${v.use}`
               } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
                  return `└  ◦  ${prefix + v.usage} ${v.use}`
               } else {
                  return `│  ◦  ${prefix + v.usage} ${v.use}`
               }
            }).join('\n')
            return m.reply(Func.Styles(print, 1))
         } else {
            let cmd = plugins.filter(v => v.usage && v.category)
            let category = []
            for (let obj of cmd) {
               if (!obj.category) continue
               if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
               else {
                  category[obj.category] = []
                  category[obj.category].push(obj)
               }
            }
            let rows = []
            const keys = Object.keys(category).sort()
            for (let k of keys) {
               rows.push({
                  title: k.toUpperCase(),
                  rowId: `${prefix}menutype ${k}`,
                  description: ``
               })
            }
            client.sendList(m.chat, '', Func.Styles(message, 1), global.botname, 'Tap!', [{
               rows
            }], m)
         }
      } else if (style == 4) {
      let liv = `👋Hi i'm LIVOID ! 🥳\n\n

⛩️ Botname = Liv - Void
⛩️ Version = 1.0.0 (type 100) 
⛩️ Library = baileys
⛩️ Owner = mr.one
⛩️ Uptime = ${Func.toTime(process.uptime() * 1000)}`
              /*   liv+= `*CMD FOR Liv MENU*\n${readmore}`
                 liv += `◦ *voicechangermenu*\n◦ *userinfomenu*\n◦ *textmakermenu*\n◦ *searchingmenu*\n◦ *ownermenu*\n◦ *nsfwmenu*\n◦ *miscsmenu*\n◦ *imagemakermenu*\n◦ *groupmenu*\n◦ *gamemenu*\n◦ *featuremenu*\n◦ *adminmenu*\n◦ *allmenu*\n◦ *imagetoolsmenu*\n\n`*/
             
let thumbnya = 'https://iili.io/JJVxCas.jpg'
         let cmd = plugins.filter(v => v.usage && v.category)
         let category = []
         for (let obj of cmd) {
            if (Object.keys(category).includes(obj.category)) category[obj.category].push(obj)
            else {
               category[obj.category] = []
               category[obj.category].push(obj)
            }
         }
         const keys = Object.keys(category).sort()
         let print = message
         print += '\n' + String.fromCharCode(8206).repeat(4001)
         for (let k of keys) {
            print += '\n\n⛩️ *' + k.toUpperCase().split('').map(v => v).join(' ') + '* ⛩️\n\n'
            let cmd = plugins.filter(v => v.usage && v.category == k.toLowerCase())
            if (cmd.length == 0) return
            let commands = []
            cmd.map(v => {
               switch (v.usage.constructor.name) {
                  case 'Array':
                     v.usage.map(x => commands.push({
                        usage: x,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     }))
                     break
                     
                  case 'String':
                     commands.push({
                        usage: v.usage,
                        use: v.use ? Func.texted('bold', v.use) : ''
                     })
               }
            })   
            print += commands.sort((a, b) => a.usage.localeCompare(b.usage)).map((v, i) => {
               if (i == 0) {
                  return `➛ . . . . .\n× ${prefix + v.usage} ${v.use}`
               } else if (i == commands.sort((a, b) => a.usage.localeCompare(b.usage)).length - 1) {
                  return `× ${prefix + v.usage} ${v.use}\n➛ Liv-Void by ᴍʀ.ᴏɴᴇ®𝟸𝟶𝟸𝟹`
               } else {
                  return `× ${prefix + v.usage} ${v.use}`
               }
            }).join('\n')
         }
         client.sendReact(m.chat, '🕒', m.key)
         client.menu[id] = [
        client.sendMessageVerify(m.chat, liv + '\n\n' + Func.Styles(print, 1) + '\n\n', thumbnya, global.footer)
            
            ]
            client.sendMessage(m.chat, { audio: { url: 'https://pomf2.lain.la/f/vfcuar0v.mp3' }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,3,58,44,35,32,2,4,31,35,44,34,48,13,0,54,49,40,1,44,50,51,16,0,3,40,39,46,3,42,38,44,46,0,0,47,0,0,46,19,20,48,43,49,0,0,39,40,31,18,29,17,25,37,51,22,37,34,19,11,17,12,16,19] }, { quoted: m }) 
       

          } } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['menu'],
   hidden: ['command', 'tod', 'help', 'menutype']
}, __filename)