neoxr.create(async (m, {
      client,
      chats,
      command,
      prefix,
      text,
      Scraper, 
      Func
   }) => {
      try { 
let old = new Date()           
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
client.sendReact(m.chat, '🕒', m.key)
let img = await q.download()
let url = await Scraper.uploadImage(img)
let json = await Rul.toanime(url.data.url) 
let buff = await Func.fetchBuffer(json)
    client.sendFile(m.chat, buff, '', `🚩 *Fetching* : ${((new Date - old) * 1)} ms`, m)

.catch(err => {
    console.log('Error', err);
    client.reply(m.chat, err, m)
})
      } catch (e) {
         console.log(e)
      }
   }, {
   usage: ['toanime'],
   hidden: ['toanim'],
   use: 'reply image',
   category: 'image maker',
   premium: false,
   limit: true
}, __filename)