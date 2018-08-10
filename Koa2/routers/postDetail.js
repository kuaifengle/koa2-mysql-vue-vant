let router = require('koa-router')();
let postsModel = require('../mysql.js')

const getToken = require('../token/getToken.js');


// 文章详情
router.get('/postDetail', getToken, async (ctx, next) => {
  var key = ctx.query.id

  await postsModel.postDetail(key).then(async (res, err) => {

    if (res[0]) {
      if (ctx.userInfo && res[0].userName === ctx.userInfo.userName && res[0].userId === ctx.userInfo.userId) {
        res[0].isMyself = 1
      }
      ctx.body = {
        state: 1,
        msg: '文章获取成功',
        data: res
      }
      await postsModel.updatePostsHot([Number(res[0].hot) + 1, res[0].id])
    } else {
      ctx.body = {
        state: 0,
        msg: '文章获取失败',
        data: res
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