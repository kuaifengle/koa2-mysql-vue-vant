let router = require('koa-router')();
let userModel = require('../mysql.js')

const checkToken = require('../token/checkToken.js');


// 用来测试获取解析后的userInfo
router.get('/', checkToken, async (ctx, next) => {
    console.log(ctx.userInfo)
    ctx.body = {
      state: 0,
      msg: 'test!',
      data: [{
        token: ctx.header.authorization,
        userInfo: ctx.userInfo
      }]
    }
})

module.exports = router