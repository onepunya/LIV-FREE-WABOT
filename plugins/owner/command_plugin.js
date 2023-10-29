neoxr.create(async (m, {
   client,
   args,
   prefix,
   command,
   Func
}) => {
   try {
      let system = global.db.setting
      const plugins = global.neoxr.plugins.filter(v => v.pluginName).map(v => v.pluginName)
      const commands = global.neoxr.plugins.filter(v => v.usage).map(v => v.usage).concat(global.neoxr.plugins.filter(v => v.hidden).map(v => v.hidden)).flat(Infinity)
      if (/plug(dis|en)/.test(command)) {
         if (!plugins.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js not found.`), m)
         if (command == 'plugdis') {
            if (system.pluginDisable.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js previously has been disabled.`), m)
            system.pluginDisable.push(args[0])
            client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js successfully disabled.`), m)
         } else if (command == 'plugen') {
            if (!system.pluginDisable.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js not found.`), m)
            system.pluginDisable.forEach((data, index) => {
               if (data === args[0]) system.pluginDisable.splice(index, 1)
            })
            client.reply(m.chat, Func.texted('bold', `🚩 Plugin ${args[0]}.js successfully enable.`), m)
         }
      } else if (/enable|disable/.test(command)) {
         if (!commands.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Command ${prefix + args[0]} does not exist.`), m)
         if (command == 'disable') {
            if (system.error.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 ${prefix + args[0]} command was previously disabled.`), m)
            system.error.push(args[0])
            client.reply(m.chat, Func.texted('bold', `🚩 Command ${prefix + args[0]} disabled successfully.`), m)
         } else if (command == 'enable') {
            if (!system.error.includes(args[0])) return client.reply(m.chat, Func.texted('bold', `🚩 Command ${prefix + args[0]} does not exist.`), m)
            system.error.forEach((data, index) => {
               if (data === args[0]) system.error.splice(index, 1)
            })
            client.reply(m.chat, Func.texted('bold', `🚩 Command ${prefix + args[0]} successfully activated.`), m)
         }
      }
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
}, {
   usage: ['plugdis', 'plugen', 'disable', 'enable'],
   use: 'plugin / command',
   category: 'owner',
   owner: true
}, __filename)