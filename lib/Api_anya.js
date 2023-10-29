const { Function: Func } = new(require('@lanbott/lanbot-js'))
const fetch = require('node-fetch')

module.exports = class Api_anya {
   baseUrl = 'https://apikey.anyacute.my.id/api'
   apikey = null 

   constructor(apikey) {
      this.apikey = apikey || ''
   }
   
   img = async (text) => {
      let json = this.baseUrl + '/wallpaper/' + text + '?apikey=' + this.apikey
      return json
   }
   cosplay = async () => {
      let json = this.baseUrl + '/random/cosplay?apikey=' + this.apikey
      return json
   }
   playmp3 = async (text) => {
      let json = await Func.fetchJson(this.baseUrl + '/yt/playmp3?query=' + text + '&apikey=' + this.apikey)
      return json
   }
    playmp4 = async (text) => {
      let json = await Func.fetchJson(this.baseUrl + '/yt/playmp4?query=' + text + '&apikey=' + this.apikey)
      return json
   }
   nsfw = async (text) => {
      let json = this.baseUrl + '/nsfw/' + text + '?apikey=' + this.apikey
      return json
   }
}