let router = require('koa-router')();
let userModel = require('../mysql.js')
const checkToken = require('../token/checkToken.js');


router.get('/userDetail', checkToken,async (ctx, next) => {

  console.log(ctx.userInfo)
  var key = ctx.userInfo.userName
  await userModel.findUser(key).then((res) => {
    ctx.body = {
      state: 1,
      msg: '用户信息获取成功',
      data: res
    }
  }).catch((err) => {
    ctx.body = {
      state: 0,
      msg: err,
      data: []
    }
  })

})

module.exports = router