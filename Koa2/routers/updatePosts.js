let router = require('koa-router')();
let postsModel = require('../mysql.js')

const checkToken = require('../token/checkToken.js');

// 更新文章
router.get('/updatePosts', checkToken, async (ctx, next) => {

    if (!ctx.query.title) {
      ctx.body = {
        state: 0,
        msg: '请输入标题!',
        data: []
      }
      return false
    }

    if (!ctx.query.content) {
      ctx.body = {
        state: 0,
        msg: '请输入内容!',
        data: []
      }
      return false
    }

  await postsModel.postDetail(ctx.query.id).then((res) => {

    if (ctx.userInfo && res[0].userName === ctx.userInfo.userName && res[0].userId === ctx.userInfo.userId) {
      ctx.body = {
        state: 1,
        msg: '用户验证失效',
        data: []
      }
      return false
    }
  })

    let postsData = {
      id: ctx.query.id,
      title: ctx.query.title,
      content: ctx.query.content
    }

    //(title, content)
    await postsModel.updatePosts([postsData.title, postsData.content, postsData.id]).then((res) => {
      ctx.body = {
        state: 1,
        msg: '文章修改成功',
        data: {
          postId: res.insertId
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