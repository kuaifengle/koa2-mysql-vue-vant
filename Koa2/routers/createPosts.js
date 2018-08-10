let router = require('koa-router')();
let postsModel = require('../mysql.js')

const checkToken = require('../token/checkToken.js');

// 新建文章
router.get('/createPosts', checkToken, async (ctx, next) => {

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
    let user = ctx.userInfo

    let postsData = {
      userName: user.userName,
      userId: user.userId,
      avator: user.avator,
      title: ctx.query.title,
      content: ctx.query.content
    }

    //(userName, userId, avator, title, content, pv, comments, createTime)
    await postsModel.createPosts([postsData.userName, postsData.userId, postsData.avator, postsData.title, postsData.content, 0, 0, new Date().getTime()]).then((res) => {

      ctx.body = {
        state: 1,
        msg: '文章新建成功',
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