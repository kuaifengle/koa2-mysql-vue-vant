let router = require('koa-router')();
let commentModel = require('../mysql.js')

// 获取所有留言
router.get('/commentList', async (ctx, next) => {

  if (!ctx.query.id) {
    ctx.body = {
      state: 0,
      msg: '获取留言失败',
      data: []
    }
    return false
  }

  await commentModel.commentList(ctx.query.id).then((res) => {
    ctx.body = {
      state: 1,
      msg: '留言获取成功',
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