const router = require('koa-router')();
const uuidV1 = require('uuid/v1');
const userModel = require('../mysql.js');
const fs = require('fs');

// 注册
router.post('/signUp', async (ctx, next) => {
  let user = {
    userName: ctx.request.body.userName,
    passWord: ctx.request.body.passWord,
    repeatPass: ctx.request.body.repeatPass,
    avator: ctx.request.body.avator
  }

  await userModel.findUser(user.userName).then(async (res) => {
    if (res.length) { // length > 1 说明 表中有数据
      try {
        throw Error('用户已存在')
      } catch (err) {
        console.log(err)
      }
      ctx.body = {
        state: 0,
        msg: '用户已存在!',
        data: []
      }
    } else if (!user.userName || user.passWord !== user.repeatPass) {
      ctx.body = {
        state: 0,
        msg: '密码输入错误',
        data: []
      }
    } else {  // 否者没有注册
      let base64Data = user.avator.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = new Buffer(base64Data, 'base64');
      let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()

      // 上传图片到 public/images 文件夹中
      await fs.writeFile('./public/images/' + getName + '.png', dataBuffer, err => {
          if (err) {
            console.log(err);
            return false
          }
          console.log('头像上传成功') 
      });  

      await userModel.insetUser([uuidV1(), user.userName, user.passWord, getName, new Date().getTime()]).then((res) => {
        console.log('注册成功')
        ctx.body = {
          state: 1,
          msg: '注册成功',
          data: []
        }
      }).catch((err) => {
        ctx.body = {
          state: 0,
          msg: err,
          data: []
        }
      })
    }

  })

})

module.exports = router