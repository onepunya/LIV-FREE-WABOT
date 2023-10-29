const { Function: Func } = new(require('@lanbott/lanbot-js'))
const fs = require('fs')

module.exports = client => {
    
   client.fakeLoc = async (jid, text, caption) => {
   const location = {
      key: {
         fromMe: false,
         participant: `0@s.whatsapp.net`,
         ...(jid ? {
            remoteJid: 'status@broadcast'
         } : {})
      },
      message: {
         "imageMessage": {
            "mimetype": "image/jpeg",
            "caption": caption,
            "jpegThumbnail": await Func.createThumb(await fs.readFileSync(`./media/image/thumb.jpg`))
         }
      }
   }
   await client.sendPresenceUpdate('composing', jid)
   return client.reply(jid, text, location)
}

}
client.sendMessageVerify = async (jid, text, thumb, caption) => {
      let location = {
         key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(jid ? {
               remoteJid: 'status@broadcast'
            } : {})
         },
         message: {
            "locationMessage": {
               "name": caption || Func.makeId(20),
               "jpegThumbnail": await Func.createThumb(thumb ? await Func.fetchBuffer(thumb) : await Func.fetchBuffer('https://telegra.ph/file/4a452cee083b2d3cc6f6c.jpg'))
            }
         }
      }
      return client.sendMessageModify(jid, text, location, {
         ads: false,
         largeThumb: true
      })

     
   }
     client.sendProgress = async (jid, text, quoted) => {
      const bars = [
         '[⬢⬡⬡⬡⬡⬡⬡⬡⬡⬡] 10%',
         '[⬢⬢⬢⬡⬡⬡⬡⬡⬡⬡] 30%',
         '[⬢⬢⬢⬢⬢⬡⬡⬡⬡⬡] 50%',
         '[⬢⬢⬢⬢⬢⬢⬢⬢⬢⬢] 100%',
         text
      ]
      client.reply(jid, '[⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡] 0%', quoted).then(async v => {
         for (let bar of bars) {
            await Func.delay(1000)
            client.relayMessage(jid, {
               protocolMessage: {
                  key: v.key,
                  type: 14,
                  editedMessage: {
                     conversation: bar
                  }
               }
            }, {})
         }
      })
   } 
  