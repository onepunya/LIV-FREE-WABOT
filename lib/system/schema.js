module.exports = (m) => {
   const isNumber = x => typeof x === 'number' && !isNaN(x)
   let user = global.db.users.find(v => v.jid == m.sender)
   if (user) {
      if (!('name' in user)) user.name = m.pushName
      if (!isNumber(user.afk)) user.afk = -1
      if (!('afkReason' in user)) user.afkReason = ''
      if (!('afkObj' in user)) user.afkObj = {}
      if (!('banned' in user)) user.banned = false
      if (!isNumber(user.banTemp)) user.banTemp = 0
      if (!isNumber(user.banTimes)) user.banTimes = 0
      if (!isNumber(user.point)) user.point = 0
      if (!isNumber(user.guard)) user.guard = 0
      if (!isNumber(user.limit)) user.limit = global.limit
      if (!isNumber(user.limitGame)) user.limitGame = global.limitGame
      if (!isNumber(user.lastclaim)) user.lastclaim = 0
      if (!('premium' in user)) user.premium = false
      if (!isNumber(user.expired)) user.expired = 0
      if (!isNumber(user.lastseen)) user.lastseen = 0
      if (!isNumber(user.hit)) user.hit = 0
      if (!isNumber(user.spam)) user.spam = 0
      if (!isNumber(user.warning)) user.warning = 0
      if (!isNumber(user.attempt)) user.attempt = 0
      if (!('code' in user)) user.code = ''
      if (!isNumber(user.codeExpire)) user.codeExpire = 0
      if (!('email' in user)) user.email = ''
      if (!('verified' in user)) user.verified = false
   } else {
      global.db.users.push({
         jid: m.sender,
         name: m.pushName,
         afk: -1,
         afkReason: '',
         afkObj: {},
         banned: false,
         banTemp: 0,
         banTimes: 0,
         point: 0,
         guard: 0,
         limit: global.limit,
         limitGame: global.limitGame,
         lastclaim: 0,
         premium: false,
         expired: 0,
         lastseen: 0,
         hit: 0,
         spam: 0,
         warning: 0,
         attempt: 0,
         code: '',
         codeExpire: 0,
         email: '',
         verified: false
      })
   }

   if (m.isGroup) {
      let group = global.db.groups.find(v => v.jid == m.chat)
      if (group) {
         if (!isNumber(group.activity)) group.activity = 0
         if (!('antibot' in group)) group.antibot = true
         if (!('antidelete' in group)) group.antidelete = true
         if (!('antilink' in group)) group.antilink = true
         if (!('antiporn' in group)) group.antiporn = true
         if (!('antivirtex' in group)) group.antivirtex = true
         if (!('captcha' in group)) group.captcha = false
         if (!('filter' in group)) group.filter = true
         if (!('game' in group)) group.game = true
         if (!('left' in group)) group.left = true
         if (!('localonly' in group)) group.localonly = true
         if (!('viewonce' in group)) group.viewonce = true
         if (!('mute' in group)) group.mute = false
         if (!('member' in group)) group.member = {}
         if (!('text_left' in group)) group.text_left = ''
         if (!('text_welcome' in group)) group.text_welcome = ''
         if (!('welcome' in group)) group.welcome = true
         if (!('simi' in group)) group.simi = false
         if (!isNumber(group.expired)) group.expired = 0
         if (!('stay' in group)) group.stay = false
      } else {
         global.db.groups.push({
            jid: m.chat,
            activity: new Date * 1,
            antibot: true,
            antidelete: true,
            antilink: true,
            antiporn: true,
            antivirtex: true,
            captcha: false,
            filter: true,
            game: true,
            left: true,
            localonly: true,
            viewonce: true,
            mute: false,
            member: {},
            text_left: '',
            text_welcome: '',
            welcome: true,
            simi: false,
            expired: 0,
            stay: false
         })
      }
   }

   let chat = global.db.chats.find(v => v.jid == m.chat)
   if (chat) {
      if (!isNumber(chat.chat)) chat.chat = 0
      if (!isNumber(chat.lastchat)) chat.lastchat = 0
      if (!isNumber(chat.lastseen)) chat.lastseen = 0
      if (!isNumber(chat.command)) chat.command = 0
   } else {
      global.db.chats.push({
         jid: m.chat,
         chat: 0,
         lastchat: 0,
         lastseen: 0,
         command: 0
      })
   }

   let setting = global.db.setting
   if (setting) {
      if (!('antispam' in setting)) setting.antispam = true
      if (!('autodownload' in setting)) setting.autodownload = true
      if (!('chatbot' in setting)) setting.chatbot = true
      if (!('debug' in setting)) setting.debug = false
      if (!('games' in setting)) setting.games = false
      if (!('error' in setting)) setting.error = []
      if (!('pluginDisable' in setting)) setting.pluginDisable = []
      if (!('receiver' in setting)) setting.receiver = []
      if (!('levelup' in setting)) setting.levelup = true
      if (!('groupmode' in setting)) setting.groupmode = false
      if (!('sk_pack' in setting)) setting.sk_pack = ''
      if (!('sk_author' in setting)) setting.sk_author = ''
      if (!('self' in setting)) setting.self = false
      if (!('noprefix' in setting)) setting.noprefix = true
      if (!('multiprefix' in setting)) setting.multiprefix = true
      if (!('prefix' in setting)) setting.prefix = ['.', '/', '!', '#']
      if (!('modelid' in setting)) setting.modelid = "revAnimated_v122.safetensors [3f4fefd9]"
      if (!('ratio' in setting)) setting.ratio = "portrait"
      if (!('sampler' in setting)) setting.sampler = "DPM fast"
      if (!('model' in setting)) setting.model = "control_v11p_sd15_openpose [cab727d4]"
      if (!('module' in setting)) setting.module = "openpose_full"
      if (!('nprompt' in setting)) setting.nprompt = "canvas frame, cartoon, 3d, ((disfigured)), ((bad art)), ((deformed)),((extra limbs)),((close up)),((b&w)), weird colors, blurry, (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), Photoshop, video game, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, blurry, bad art, bad anatomy, 3d render"
      if (!isNumber(setting.height)) setting.height = 512
      if (!isNumber(setting.width)) setting.width = 512
      if (!('toxic' in setting)) setting.toxic = ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "wildan", "xnxx"]
      if (!('online' in setting)) setting.online = true
      if (!('onlyprefix' in setting)) setting.onlyprefix = '+'
      if (!('owners' in setting)) setting.owners = [""]
      if (!isNumber(setting.lastReset)) setting.lastReset = new Date * 1
      if (!('msg' in setting)) setting.msg = ''
      if (!isNumber(setting.menuStyle)) setting.menuStyle = 4
      if (!('cover' in setting)) setting.cover = 'https://iili.io/J2myOnn.jpg'
      if (!('link' in setting)) setting.link = 'https://chat.whatsapp.com/Dh1USlrqIfmJT6Ji0Pm2pP'
      if (!('quizset' in setting)) setting.quizset = []
   } else {
      global.db.setting = {
         antispam: true,
         autodownload: true,
         chatbot: true,
         debug: false,
         games: true,
         error: [],
         pluginDisable: [],
         receiver: [],
         levelup: true,
         groupmode: false,
         sk_pack: 'Liv-Ai',
         sk_author: 'mr.one√ sk',
         self: false,
         nopefix: true,
         multiprefix: true,
         prefix: ['.', '#', '!', '/'],
         toxic: ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "wildan", "xnxx"],
         online: true,
         onlyprefix: '+',
         owners: [""],
         lastReset: new Date * 1,
         msg: '',
         quizset: []
      }
   }
}