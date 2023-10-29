const { Function: Func } = new(require('@lanbott/lanbot-js'))
const fetch = require('node-fetch')

module.exports = class Api_Zoner {
   baseUrl = 'https://api.zonerweb.biz.id'
   apikey = null 

   constructor(apikey) {
      this.apikey = apikey || ''
   }
   
   cai2 = async (text, char) => {
      let json = await Func.fetchJson(this.baseUrl + '/api/ai/cai2?text=' + text + '&char=' + char + '&apikey=' + this.apikey)
      return json
   }
      simi = async (text) => {
      let json = await Func.fetchJson(this.baseUrl + '/api/ai/simi3?text=' + text + '&lc=id&apikey=' + this.apikey)
      return json
   }
   

   }