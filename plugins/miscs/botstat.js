const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
neoxr.create(async (m, {
   client,
   blockList,
   Func
}) => {
   try {
      let users = global.db.users.length
      let chats = global.db.chats.filter(v => v.jid && v.jid.endsWith('.net')).length
      let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groups = await (await groupList()).map(v => v.id).length
      let banned = global.db.users.filter(v => v.banned).length
      let premium = global.db.users.filter(v => v.premium).length
      let verified = global.db.users.filter(v => v.verified).length
      let plugins = neoxr.plugins.filter(v => !global.db.setting.pluginDisable.includes(v.pluginName))
      let commands = plugins.filter(v => v.usage).map(v => v.usage).concat(plugins.filter(v => v.hidden).map(v => v.hidden)).flat(Infinity)
      class Hit extends Array {
         total(key) {
            return this.reduce((a, b) => a + (b[key] || 0), 0)
         }
      }
      let sum = new Hit(...Object.values(global.db.statistic))
      let hitstat = sum.total('hitstat') != 0 ? sum.total('hitstat') : 0
      const stats = {
         users,
         chats,
         groups,
         cmd: commands.length,
         banned,
         blocked: blockList.length,
         verified,
         premium,
         hitstat,
         uptime: Func.toTime(process.uptime() * 1000)
      }
      const system = global.db.setting
      client.sendMessageModify(m.chat, statistic(stats, system, Func), m, {
         largeThumb: true
      })
   } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['botstat'],
   hidden: ['stat'],
   category: 'miscs'
}, __filename)

const statistic = (stats, system, Func) => {
   if (global.db.setting.menuStyle == 3 || global.db.setting.menuStyle == 4) {
      return ` –  *B O T S T A T*

┌  ◦  ${Func.texted('bold', Func.formatter(stats.groups))} Groups Joined
│  ◦  ${Func.texted('bold', Func.formatter(stats.chats))} Personal Chats
│  ◦  ${Func.texted('bold', Func.formatter(stats.users))} Users In Database
│  ◦  ${Func.texted('bold', Func.formatter(stats.banned))} Users Banned
│  ◦  ${Func.texted('bold', Func.formatter(stats.blocked))} Users Blocked
│  ◦  ${Func.texted('bold', Func.formatter(stats.verified))} Users Verified
│  ◦  ${Func.texted('bold', Func.formatter(stats.premium))} Premium Users
│  ◦  ${Func.texted('bold', Func.formatter(stats.hitstat))} Commands Hit
│  ◦  ${Func.texted('bold', Func.formatter(stats.cmd))} Available Commands
└  ◦  Runtime : ${Func.texted('bold', stats.uptime)}
  
 –  *S Y S T E M*

┌  ◦  ${Func.texted('bold', system.antispam ? '[ √ ]' : '[ × ]')}  Anti Spam
│  ◦  ${Func.texted('bold', system.debug ? '[ √ ]' : '[ × ]')}  Debug Mode
│  ◦  ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  Group Mode
│  ◦  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  Always Online
│  ◦  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  Self Mode
│  ◦  ${Func.texted('bold', system.noprefix ? '[ √ ]' : '[ × ]')}  No Prefix
│  ◦  Prefix : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
└  ◦  Reset At : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   } else {
      return `乂  *B O T S T A T*

	◦  ${Func.texted('bold', Func.formatter(stats.groups))} Groups Joined
	◦  ${Func.texted('bold', Func.formatter(stats.chats))} Personal Chats
	◦  ${Func.texted('bold', Func.formatter(stats.users))} Users In Database
	◦  ${Func.texted('bold', Func.formatter(stats.banned))} Users Banned
	◦  ${Func.texted('bold', Func.formatter(stats.blocked))} Users Blocked
	◦  ${Func.texted('bold', Func.formatter(stats.verified))} Users Verified
	◦  ${Func.texted('bold', Func.formatter(stats.premium))} Premium Users
	◦  ${Func.texted('bold', Func.formatter(stats.hitstat))} Commands Hit
	◦  ${Func.texted('bold', Func.formatter(stats.cmd))} Available Commands
	◦  Runtime : ${Func.texted('bold', stats.uptime)}

乂  *S Y S T E M*

	◦  ${Func.texted('bold', system.debug ? '[ √ ]' : '[ × ]')}  Debug Mode
	◦  ${Func.texted('bold', system.groupmode ? '[ √ ]' : '[ × ]')}  Group Mode
	◦  ${Func.texted('bold', system.online ? '[ √ ]' : '[ × ]')}  Always Online
	◦  ${Func.texted('bold', system.self ? '[ √ ]' : '[ × ]')}  Self Mode
	◦  ${Func.texted('bold', system.noprefix ? '[ √ ]' : '[ × ]')}  No Prefix
	◦  Prefix : ${Func.texted('bold', system.multiprefix ? '( ' + system.prefix.map(v => v).join(' ') + ' )' : '( ' + system.onlyprefix + ' )')}
	◦  Reset At : ${moment(system.lastReset).format('DD/MM/YYYY HH:mm')}

${global.footer}`
   }
}