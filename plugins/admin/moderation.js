neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   isBotAdmin,
   Func
}) => {
   try {
      let setting = global.db.groups.find(v => v.jid == m.chat)
      let type = command.toLowerCase()
      if (!isBotAdmin && /antibot|antiporn|antilink|antivirtex|captcha|filter|localonly|autosticker|/.test(type)) return client.reply(m.chat, global.status.botAdmin, m)
      if (!args || !args[0]) return client.reply(m.chat, `🚩 *Current status* : [ ${setting[type] ? 'ON' : 'OFF'} ] (Enter *On* or *Off*)`, m)
      let option = args[0].toLowerCase()
      let optionList = ['on', 'off']
      if (!optionList.includes(option)) return client.reply(m.chat, `🚩 *Current status* : [ ${setting[type] ? 'ON' : 'OFF'} ] (Enter *On* or *Off*)`, m)
      let status = option != 'on' ? false : true
      if (setting[type] == status) return client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} has been ${option == 'on' ? 'activated' : 'inactivated'} previously.`), m)
      setting[type] = status
      client.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} has been ${option == 'on' ? 'activated' : 'inactivated'} successfully.`), m)
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['antibot', 'antidelete', 'antiporn', 'antilink', 'antivirtex', 'left', 'filter', 'localonly', 'viewonce', 'welcome', 'simi'],
   use: 'on / off',
   category: 'admin',
   group: true,
   admin: true
}, __filename)