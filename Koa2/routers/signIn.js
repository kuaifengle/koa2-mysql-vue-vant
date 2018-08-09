let router = require('koa-router')();
let userModel = require('../mysql.js');

const createToken = require('../token/createToken.js');

router.post('/signIn',async (ctx, next) => {
  let user = {
    userName: ctx.request.body.userName,
    passWord: ctx.request.body.passWord
  }

  await userModel.findUser(user.userName).then((res) => {
    if (!res.length) {
      ctx.body = {
        state: 0,
        msg: '用户未注册!',
        data: []
      }
      console.log('用户未注册')
    } else {
      if (res[0].passWord === user.passWord) {
        let token = createToken(res[0])

        ctx.body = {
          state: 1,
          msg: '用户登录成功!',
          data: [],
          token
        }
        console.log('密码校验正确, 允许登录')
      } else {
        ctx.body = {
          state: 0,
          msg: '用户名或者密码错误!',
          data: []
        }
        console.log('用户名或者密码错误')
      }
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