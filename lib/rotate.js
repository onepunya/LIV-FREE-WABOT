/*sory enceh : kalo mau no enceh beli 😁 murah kok 
kontak saya : wa.me/6289602518223
ig : @mr.one.id
yt : @ZavodMd
git : https://github.com/OnesenpaiKiNO
grup wa : https://chat.whatsapp.com/FRL4FzReE0X4qf8Yy80RkW
bot utama : wa.me/6282135819880
bot sc ini : wa.me/6289676358643
====================================*/
const axios = require('axios'),
   cheerio = require('cheerio')

function ezRotate(target, file, token, type) {
   return new Promise(async (resolve, reject) => {
      try {
         let form = new URLSearchParams()
         form.append('file', file)
         form.append('token', token)
         form.append(type, 'on')
         form.append('free_deg', 45)
         form.append('submit', 'Upload!')
         let html = await (await axios.post(target, form)).data
         let $ = cheerio.load(html)
         resolve($('p.outfile > img').attr('src'))
      } catch (e) {
         console.log(e)
         resolve({
            creator: '@Dellas',
            status: false
         })
      }
   })
}

function _0x31b2(_0x155258,_0x2ea505){const _0x1a6e2a=_0x1a6e();return _0x31b2=function(_0x31b29c,_0x300756){_0x31b29c=_0x31b29c-0x14a;let _0x202bf2=_0x1a6e2a[_0x31b29c];return _0x202bf2;},_0x31b2(_0x155258,_0x2ea505);}const _0x546101=_0x31b2;(function(_0x379292,_0x5205d6){const _0x206aa0=_0x31b2,_0x58de73=_0x379292();while(!![]){try{const _0x187078=-parseInt(_0x206aa0(0x15d))/0x1+-parseInt(_0x206aa0(0x15a))/0x2*(parseInt(_0x206aa0(0x165))/0x3)+parseInt(_0x206aa0(0x15f))/0x4*(-parseInt(_0x206aa0(0x158))/0x5)+parseInt(_0x206aa0(0x168))/0x6+parseInt(_0x206aa0(0x14b))/0x7*(parseInt(_0x206aa0(0x151))/0x8)+parseInt(_0x206aa0(0x160))/0x9+parseInt(_0x206aa0(0x15b))/0xa*(parseInt(_0x206aa0(0x150))/0xb);if(_0x187078===_0x5205d6)break;else _0x58de73['push'](_0x58de73['shift']());}catch(_0x13c7a3){_0x58de73['push'](_0x58de73['shift']());}}}(_0x1a6e,0x93907),module[_0x546101(0x14a)]=(_0x1e43b7,_0x435caa)=>{return new Promise(async(_0x4288cd,_0x3d43d1)=>{const _0x13bb2e=_0x31b2;try{let _0x1b8299=new URLSearchParams();_0x1b8299['append'](_0x13bb2e(0x155),_0x1e43b7),_0x1b8299[_0x13bb2e(0x163)]('submit',_0x13bb2e(0x156));let _0x294acd=await(await axios[_0x13bb2e(0x14f)](_0x13bb2e(0x14d),_0x1b8299))[_0x13bb2e(0x152)],_0x2ccd52=cheerio[_0x13bb2e(0x15c)](_0x294acd),_0x547bbe=[];_0x2ccd52(_0x13bb2e(0x153))['each']((_0x58339d,_0x559ea1)=>{const _0x5e2ff5=_0x13bb2e;let _0x5bea3e=_0x2ccd52(_0x559ea1)[_0x5e2ff5(0x157)]('src');if(_0x5bea3e['match'](/(\/tmp\/)/g))_0x547bbe['push'](_0x5bea3e);});if(_0x547bbe[_0x13bb2e(0x154)]==0x0)return _0x4288cd({'creator':'@Dellas','status':![]});let _0x42d24b={'target':_0x2ccd52(_0x13bb2e(0x169))[_0x13bb2e(0x157)](_0x13bb2e(0x162)),'filename':_0x547bbe[0x0][_0x13bb2e(0x14e)]`/`[0x4],'token':_0x2ccd52(_0x13bb2e(0x167))[_0x13bb2e(0x157)]('value')},_0x394781=await ezRotate(_0x42d24b[_0x13bb2e(0x164)],_0x42d24b[_0x13bb2e(0x161)],_0x42d24b[_0x13bb2e(0x14c)],_0x435caa);_0x4288cd({'creator':_0x13bb2e(0x15e),'status':!![],'data':{'url':_0x13bb2e(0x159)+_0x394781}});}catch(_0x244b29){console[_0x13bb2e(0x166)](_0x244b29),_0x4288cd({'creator':_0x13bb2e(0x15e),'status':![]});}});});function _0x1a6e(){const _0x4cbb21=['6227667jJMoyY','filename','action','append','target','3kfBcxv','log','input[name=\x22token\x22]','3153588gaztzl','form[class=\x22form\x20ajax-form\x22]','exports','4451979kxGsgt','token','https://s6.ezgif.com/rotate','split','post','2992594qAVUFI','8CrFzMK','data','img','length','new-image-url','Upload!','attr','5UvNCDh','https:','1282414ZHhxUm','10fEmjyK','load','786363rcdyQc','@Dellas','374476IpQnZM'];_0x1a6e=function(){return _0x4cbb21;};return _0x1a6e();}