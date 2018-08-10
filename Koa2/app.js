const path = require('path')
const Koa = require('koa2');
const router = require('koa-router');
var cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const config = require('./config.js');
const server = require('koa-static');
const jwt = require('jsonwebtoken')

require('./mysql.js');

const app = new Koa();

app.use(server(
  path.join(__dirname , './public')
)) // 设置静态文件

app.use(cors({
      origin: 'http://localhost:8080',
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
); // 设置跨域


app.use(bodyParser({
  formLimit: '1mb'
})) // ctx body 中间件

app.use(require('./routers/signUp.js').routes()) // 注册
app.use(require('./routers/signIn.js').routes()) // 登录

app.use(require('./routers/createPosts.js').routes()) // 新建文章
app.use(require('./routers/postsList.js').routes()) // 搜索文章
app.use(require('./routers/postDetail.js').routes()) // 文章detail
app.use(require('./routers/updatePosts.js').routes()) // 修改文章

app.use(require('./routers/createComment.js').routes()) // 添加留言
app.use(require('./routers/commentList.js').routes()) // 获取留言

app.listen(config.port) // 监听端口

console.log('listen in localhost:' + config.port)