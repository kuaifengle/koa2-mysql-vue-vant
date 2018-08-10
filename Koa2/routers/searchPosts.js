let router = require('koa-router')();
let postsModel = require('../mysql.js')


// 获取所有文章列表
router.get('/postsList', async (ctx, next) => {

    await postsModel.postsList().then((res) => {
      ctx.body = {
        state: 1,
        msg: '文章获取成功',
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