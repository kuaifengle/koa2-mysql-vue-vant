let router = require('koa-router')();
let commentModel = require('../mysql.js')

const checkToken = require('../token/checkToken.js');

// 新建留言
router.get('/createComment', checkToken, async (ctx, next) => {

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
      avator: user.avator,
      id: ctx.query.id,
      content: ctx.query.content
    }

    //(userName, content, postId, comments, avator, createTime)
    await commentModel.createComment([postsData.userName, postsData.content, postsData.id, postsData.avator, new Date().getTime()]).then(async (res) => {

      ctx.body = {
        state: 1,
        msg: '文章留言成功',
        data: []
      }
      
      await commentModel.postDetail(postsData.id).then(async (res) => {  // 文章评论数量 + 1
        console.log(res[0])
        if (res[0]) {
          await commentModel.updatePostsComment([Number(res[0].comments) + 1, res[0].id])
        }
      })
    }).catch((err) => {
      ctx.body = {
        state: 0,
        msg: err,
        data: []
      }
    })

})

module.exports = router