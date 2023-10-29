/*sory enceh : kalo mau no enceh beli 😁 murah kok 
kontak saya : wa.me/6289602518223
ig : @mr.one.id
yt : @ZavodMd
git : https://github.com/OnesenpaiKiNO
grup wa : https://chat.whatsapp.com/FRL4FzReE0X4qf8Yy80RkW
bot utama : wa.me/6282135819880
bot sc ini : wa.me/6289676358643
====================================*/


'use strict';const _0x5a4d4d=_0x1649;function _0x1649(_0x3ab3bd,_0x15a25e){const _0x1cd16e=_0x1cd1();return _0x1649=function(_0x164922,_0x3e0a47){_0x164922=_0x164922-0x78;let _0x7fbc3=_0x1cd16e[_0x164922];return _0x7fbc3;},_0x1649(_0x3ab3bd,_0x15a25e);}function _0x1cd1(){const _0x2b6dcc=['events','env','60QBNZzZ','825955XEdUgb','json-stable-stringify','5267087HDWELo','bails','EventEmitter','existsSync','database','baileys','659496brjnJT','2891349DIuvFG','DATABASE_URL','test','chalk','943538jJfXfh','pino','@adiwajshing/baileys','./lib/system/config','8838744PiWQTa','3OtiAak','4606224DxquCC','5KveNkC'];_0x1cd1=function(){return _0x2b6dcc;};return _0x1cd1();}(function(_0x3a51f6,_0x294d5b){const _0x109a6a=_0x1649,_0x29fe8b=_0x3a51f6();while(!![]){try{const _0xd34937=-parseInt(_0x109a6a(0x78))/0x1+-parseInt(_0x109a6a(0x85))/0x2*(-parseInt(_0x109a6a(0x8a))/0x3)+parseInt(_0x109a6a(0x80))/0x4+-parseInt(_0x109a6a(0x8c))/0x5*(parseInt(_0x109a6a(0x8b))/0x6)+parseInt(_0x109a6a(0x7a))/0x7+-parseInt(_0x109a6a(0x89))/0x8+-parseInt(_0x109a6a(0x81))/0x9*(-parseInt(_0x109a6a(0x8f))/0xa);if(_0xd34937===_0x294d5b)break;else _0x29fe8b['push'](_0x29fe8b['shift']());}catch(_0x3b7d57){_0x29fe8b['push'](_0x29fe8b['shift']());}}}(_0x1cd1,0x96ea4));require(_0x5a4d4d(0x88)),require(_0x5a4d4d(0x8d))[_0x5a4d4d(0x7c)]['defaultMaxListeners']=0xf;const {Extra,Function:Func,MongoDB,PostgreSQL}=new(require('@lanbott/lanbot-js'))(),{Socket,Serialize,Scandir}=Extra,pino=require(_0x5a4d4d(0x86)),spinnies=new(require('spinnies'))(),qrcode=require('qrcode-terminal'),stable=require(_0x5a4d4d(0x79)),fs=require('fs'),chalk=require(_0x5a4d4d(0x84)),baileys=fs[_0x5a4d4d(0x7d)]('./node_modules/baileys')?_0x5a4d4d(0x7f):fs[_0x5a4d4d(0x7d)]('./node_modules/@adiwajshing/baileys')?_0x5a4d4d(0x87):_0x5a4d4d(0x7b),{DisconnectReason,useMultiFileAuthState,makeInMemoryStore,msgRetryCounterMap,delay,PHONENUMBER_MCC}=require(baileys);if(process[_0x5a4d4d(0x8e)][_0x5a4d4d(0x82)]&&/mongo/['test'](process['env'][_0x5a4d4d(0x82)]))MongoDB['db']=global[_0x5a4d4d(0x7e)];const machine=process[_0x5a4d4d(0x8e)][_0x5a4d4d(0x82)]&&/mongo/[_0x5a4d4d(0x83)](process['env'][_0x5a4d4d(0x82)])?MongoDB:process[_0x5a4d4d(0x8e)][_0x5a4d4d(0x82)]&&/postgres/[_0x5a4d4d(0x83)](process['env']['DATABASE_URL'])?PostgreSQL:new(require('./lib/system/localdb'))(global[_0x5a4d4d(0x7e)]);

const store = makeInMemoryStore({
   logger: pino().child({
      level: 'silent',
      stream: 'store'
   })
})

const connect = async () => { 
   const { state, saveCreds } = await useMultiFileAuthState('session')
   global.db = {users:[], chats:[], groups:[], bots:[], files:[], statistic:{}, sticker:{}, menfess:{}, captcha:{}, setting:{}, ...(await machine.fetch() ||{})}
   await machine.save(global.db)
   
   const config = JSON.parse(fs.readFileSync('./pairing.json', 'utf-8'))
   global.client = Socket({
      logger: pino({
         level: 'silent'
      }),
      printQRInTerminal: (config.pairing && config.pairing.state && config.pairing.number) ? false : true,
      patchMessageBeforeSending: (message) => {
         const requiresPatch = !!(
            message.buttonsMessage ||
            message.templateMessage ||
            message.listMessage
         );
         if (requiresPatch) {
            message = {
               viewOnceMessage: {
                  message: {
                     messageContextInfo: {
                        deviceListMetadataVersion: 2,
                        deviceListMetadata: {},
                     },
                     ...message,
                  },
               },
            };
         }
         return message;
      },
      browser: ['Chrome (Linux)', '', ''],
      auth: state,
      getMessage: async (key) => {
         if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg.message || undefined
         }
         return {
            conversation: 'hello'
         }
      },
      // To see the latest version : https://web.whatsapp.com/check-update?version=1&platform=web
      version: [2, 2323, 4]
   })

   store.bind(client.ev)
   spinnies.add('start', {
      text: 'Connecting . . .'
   })

   if (config.pairing && config.pairing.state && !client.authState.creds.registered) {
      var phoneNumber = config.pairing.number
      if (!Object.keys(PHONENUMBER_MCC).some(v => String(phoneNumber).startsWith(v))) {
         spinnies.fail('start', {
            text: `Invalid number, start with country code (Example : 62xxx)`
         })
         process.exit(0)
      }
      setTimeout(async () => {
         try {
            let code = await client.requestPairingCode(phoneNumber)
            code = code.match(/.{1,4}/g)?.join("-") || code
            console.log(chalk.black(chalk.bgGreen(` Your Pairing Code `)), ' : ' + chalk.black(chalk.white(code)))
         } catch {}
      }, 3000)
   }

   client.ev.on('connection.update', async (update) => {
      const {
         connection,
         lastDisconnect,
         qr
      } = update
      if (connection === 'open') {
         spinnies.succeed('start', {
            text: `Connected, you login as ${client.user.name || client.user.verifiedName || 'WhatsApp Bot'}`
         })
         await delay(1000)
         spinnies.add('start', {
            text: 'Load Plugins . . .'
         })

         const plugins = await Scandir('./plugins')
         plugins.filter(v => v.endsWith('.js')).map(file => require(file))
         await delay(1000)
         spinnies.succeed('start', {
            text: `${plugins.length} Plugins loaded`
         })        
         function _0x2709(){const _0x16c444=['7poEEio','4LqyEgo','sendMessageModify','https://iili.io/JKxnQUJ.jpg','Connetion\x20detected,\x20','user','2XOtHgK','2009925eeFIYA','5339256DEyuFe','290BrDoTy','877343hQDZsD','2366805FsBivN','name','\x0a\x0a*creator*:\x20mr.one\x20&\x20dellas\x0a*sauceSC:*\x20Liv-Ai\x20WhatsApp\x20bot\x0a*gcofc*:\x20https://chat.whatsapp.com/FRL4FzReE0X4qf8Yy80RkW','\x20atau\x20\x20','2476905ElrvPR','\x20terhubung\x0apemilik\x20adalah\x20@','312587VvFSxd','owner','setting','1984578gheHse','owner_name','botname'];_0x2709=function(){return _0x16c444;};return _0x2709();}const _0x253907=_0x2bcc;function _0x2bcc(_0x55efcb,_0x4770c8){const _0x2709df=_0x2709();return _0x2bcc=function(_0x2bccbf,_0x1a8902){_0x2bccbf=_0x2bccbf-0x1b4;let _0x123c1c=_0x2709df[_0x2bccbf];return _0x123c1c;},_0x2bcc(_0x55efcb,_0x4770c8);}(function(_0x3ce488,_0x2dbf7c){const _0xd6c164=_0x2bcc,_0x375526=_0x3ce488();while(!![]){try{const _0x115581=parseInt(_0xd6c164(0x1bd))/0x1*(-parseInt(_0xd6c164(0x1b9))/0x2)+-parseInt(_0xd6c164(0x1c2))/0x3*(-parseInt(_0xd6c164(0x1b4))/0x4)+parseInt(_0xd6c164(0x1be))/0x5+-parseInt(_0xd6c164(0x1c7))/0x6*(-parseInt(_0xd6c164(0x1ca))/0x7)+-parseInt(_0xd6c164(0x1bb))/0x8+-parseInt(_0xd6c164(0x1ba))/0x9+parseInt(_0xd6c164(0x1bc))/0xa*(parseInt(_0xd6c164(0x1c4))/0xb);if(_0x115581===_0x2dbf7c)break;else _0x375526['push'](_0x375526['shift']());}catch(_0x319f30){_0x375526['push'](_0x375526['shift']());}}}(_0x2709,0xa76d1));let ppp=_0x253907(0x1b7)+global[_0x253907(0x1c9)]+_0x253907(0x1c1)+client[_0x253907(0x1b8)][_0x253907(0x1bf)]+_0x253907(0x1c3)+global[_0x253907(0x1c5)]+'\x20'+global[_0x253907(0x1c8)]+_0x253907(0x1c0);client[_0x253907(0x1b5)](global['my']+'@c.us',ppp,null,{'largeThumb':!![],'thumbnail':_0x253907(0x1b6),'url':global['db'][_0x253907(0x1c6)]['link']});
      } else if (connection === 'close') {
         if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) {
            spinnies.fail('start', {
               text: `Can't connect to Web Socket`
            })
            await machine.save()
            process.exit(0)
         } else {
            connect().catch(() => connect())
         }
      }
   })

   client.ev.on('creds.update', saveCreds)
   client.ev.on('messages.upsert', async chatUpdate => {
      try {
         let m = chatUpdate.messages[0]
         if (!m.message) return
         Serialize(client, m)
         require('./lib/system/schema')(m)
         if (!global.db.setting.online) client.sendPresenceUpdate('unavailable', m.chat)
         if (global.db.setting.online) {
            client.sendPresenceUpdate('available', m.chat)
            client.readMessages([m.key])
         }
         require('./lib/system/sys.js')(client), require('./lib/scraper'), require('./handler')(client, m, store)
      } catch (e) {
         console.log(e)
      }
   })

   client.ev.on('group-participants.update', async (room) => {
      let meta = await (await client.groupMetadata(room.id))
      let member = room.participants[0]
      let text_welcome = `Thanks +tag for joining into +grup group.`
      let text_left = `Good bye +tag :)`
      let groupSet = global.db.groups.find(v => v.jid == room.id)
      let pic
      try {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(member, 'image'))
      } catch {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(room.id, 'image'))
      }
      if (room.action == 'add') {
         if (groupSet && groupSet.localonly) {
            if (global.db.users.some(v => v.jid == member) && !global.db.users.find(v => v.jid == member).whitelist && !member.startsWith('62') || !member.startsWith('62')) {
               client.reply(room.id, Func.texted('bold', `Sorry @${member.split`@`[0]}, this group is only for indonesian people and you will removed automatically.`))
               client.updateBlockStatus(member, 'block')
               return await Func.delay(2000).then(() => client.groupParticipantsUpdate(room.id, [member], 'remove'))
            }
         }

         let txt = (groupSet.text_welcome != '' ? groupSet.text_welcome : text_welcome).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet && !groupSet.captcha && groupSet.welcome) client.sendMessageModify(room.id, txt, null, {
            largeThumb: true,
            thumbnail: pic,
            url: global.db.setting.link
         })
      } else if (room.action == 'remove') {
         let txt = (groupSet.text_left != '' ? groupSet.text_left : text_left).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet.left) client.sendMessageModify(room.id, txt, null, {
            largeThumb: true,
            thumbnail: pic,
            url: global.db.setting.link
         })
      }
   })

   client.ws.on('CB:call', async json => {
      if (json.content[0].tag == 'offer') {
         let object = json.content[0].attrs['call-creator']
         await Func.delay(2000)
         await client.updateBlockStatus(object, 'block')
      }
   })

   client.ev.on('contacts.update', update => {
      for (let contact of update) {
         let id = client.decodeJid(contact.id)
         if (store && store.contacts) store.contacts[id] = {
            id,
            name: contact.notify
         }
      }
   })

   const ramCheck = setInterval(() => {
      var ramUsage = process.memoryUsage().rss
      if (ramUsage >= global.ram_usage) {
         clearInterval(ramCheck)
         process.send('reset')
      }
   }, 60 * 1000)

   setInterval(async () => {
      const tmpFiles = fs.readdirSync('./temp')
      if (tmpFiles.length > 0) {
         tmpFiles.map(v => fs.unlinkSync('./temp/' + v))
      }
      const storeFile = await Func.getFile('./session/neoxr_store.json')
      let chSize = Func.sizeLimit(storeFile.size, 2)
      if (chSize.oversize) {
         // fs.writeFileSync('./session/neoxr_store.json', stable({"chats":[],"contacts":{},"messages":{}}))
      }
   }, 60 * 1000 * 3)

   setInterval(async () => {
      if (global.db) await machine.save(global.db)
   }, 10_000)

   return client
}

connect().catch(() => connect())
