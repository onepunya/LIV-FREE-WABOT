const request = require('request');
neoxr.create(async (m, {
      client,
      body,
      chats,
      setting,
      Func,
      text
   }) => {
      try { 
  if (!text) throw client.reply(m.chat, "kota mana", m)
request.get({
  url: 'https://api.api-ninjas.com/v1/geocoding?city=' + text,
  headers: {
    'X-Api-Key': 'aMTsmmd0x78NG68/S+2VDw==fgeXA0CWIUJv9JGI'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body) 
 client.sendProgress(m.chat, Func.jsonFormat(body), m)
})
      } catch (e) {
         console.log(e)
      }
   }, {
    usage: ['geocoding'],
   use: 'city',
   category: 'miscs',
   premium: true,
   limit: true
}, __filename)
