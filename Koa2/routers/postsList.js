let router = require('koa-router')();
let postsModel = require('../mysql.js')

router.get('/postsList', async (ctx, next) => {

  var key = ctx.query.title
  var pg = ctx.query.pg - 1 || 0
  var size = ctx.query.size || 10
  await postsModel.postsList(key, pg, size).then((res) => {
    ctx.body = {
      state: 1,
      msg: '文章列表获取成功',
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