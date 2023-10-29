const axios = require('axios'),
   FormData = require('form-data')

module.exports = async (str) => {
   return new Promise(async resolve => {
      try {
         const parse = await (await axios.get('https://tiny-img.com/webp/'))
         const cookie = parse.headers['set-cookie'].join('; ')
         const image = Buffer.isBuffer(str) ? str : str.startsWith('http') ? await (await axios.get(str, {
            responseType: 'arraybuffer'
         })).data : str
         let form = new FormData
         form.append('file', Buffer.from(image), (Math.random() + 1).toString(36).substring(7) + '.webp')
         const json = await (await axios.post('https://tiny-img.com/app/webp-files/', form, {
            headers: {
               "Accept": "*/*",
               "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
               "Origin": "https://tiny-img.com/",
               "Referer": "https://tiny-img.com",
               "Referrer-Policy": "strict-origin-when-cross-origin",
               "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
               "sec-ch-ua-platform": "Android",
               "sec-fetch-dest": "empty",
               "sec-fetch-mode": "cors",
               "sec-fetch-site": "same-origin",
               cookie,
               ...form.getHeaders(),
               "x-requested-with": "XMLHttpRequest"
            }
         })).data
         if (!json.success) return resolve({
            creator: global.creator,
            status: false,
            msg: 'Failed to convert!'
         })
         resolve({
            creator: global.creator,
            status: true,
            data: {
               url: json.optimized_image_url
            }
         })
      } catch (e) {
         console.log(e)
         resolve({
            creator: global.creator,
            status: false,
            msg: e.message
         })
      }
   })
}