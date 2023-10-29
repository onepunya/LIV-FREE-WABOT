const { Function: Func } = new(require('@lanbott/lanbot-js'))
const fetch = require('node-fetch')

module.exports = class Api_Ruulzz {
   baseUrl = 'https://apiruulzz.my.id'
   apikey = null 

   constructor(apikey) {
      this.apikey = apikey || ''
   }
   
      bard = async (text) => {
      let json = await Func.fetchJson(this.baseUrl + '/api/bard?text=' + text + '&apikey=' + this.apikey)
      return json
   }
      toanime = async (image) => {
      let json = await Func.fetchJson(this.baseUrl + '/api/toanime?url=' + image + '&apikey=' + this.apiKey)
      return json
   }
   }