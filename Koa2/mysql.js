const mysql = require('mysql');
const config = require('./config.js');

var pool = mysql.createPool(config.mysql);

const query = function (sql, val) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, val, (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
          connection.release();
        })
      }
    })
  })
}


const createTable = (sql) => {
  query(sql, [])
}

const usersTable = `CREATE TABLE IF NOT EXISTS users (
   id VARCHAR(36) NOT NULL,
   userName VARCHAR(16) NOT NULL,
   passWord VARCHAR(16) NOT NULL,
   avator VARCHAR(50) NOT NULL,
   createTime VARCHAR(50) NOT NULL,
   PRIMARY KEY (id) 
)`;

const postsTable = `CREATE TABLE IF NOT EXISTS posts (
   id INT NOT NULL AUTO_INCREMENT,
   userName VARCHAR(100) NOT NULL,
   userId VARCHAR(40) NOT NULL,
   avator VARCHAR(100) NOT NULL,
   title VARCHAR(100) NOT NULL,
   content TEXT(0) NOT NULL,
   hot VARCHAR(40) NOT NULL,
   comments VARCHAR(40) NOT NULL,
   createTime VARCHAR(100) NOT NULL,
   PRIMARY KEY (id) 
)`;

const commentTable = `CREATE TABLE IF NOT EXISTS comment (
   id INT NOT NULL AUTO_INCREMENT,
   userName VARCHAR(100) NOT NULL,
   content TEXT(0) NOT NULL,
   postId VARCHAR(40) NOT NULL,
   avator VARCHAR(100) NOT NULL,
   createTime VARCHAR(100) NOT NULL,
   PRIMARY KEY (id) 
)`;


// 建表
createTable(usersTable) // 用户表
createTable(postsTable) // 文章表
createTable(commentTable) // 评论表

const insetUser = (val) => { // 注册
  let _sql = `INSERT INTO users (id, userName, passWord, avator, createTime) VALUES (?,?,?,?,?)`
  return query(_sql, val)
}

const findUser = (val) => { // 查找所有User
  let _sql = `SELECT * FROM users WHERE userName = ${val}`
  return query(_sql)
}

const createPosts = (val) => { // 新建posts
  let _sql = `INSERT INTO posts (userName, userId, avator, title, content, hot, comments, createTime) VALUES (?,?,?,?,?,?,?,?)`
  return query(_sql, val)
}

const updatePosts = (val) => { // 修改posts
  let _sql = `UPDATE posts SET title=?, content=? WHERE id=?`
  return query(_sql, val)
}

const updatePostsComment = (val) => { // 修改posts评论数量
  let _sql = `UPDATE posts SET comments=? WHERE id=?`
  return query(_sql, val)
}

const updatePostsHot = (val) => { // 修改posts查看人数
  let _sql = `UPDATE posts SET hot=? WHERE id=?`
  return query(_sql, val)
}

const postsList = (key, pg, size) => { // 查找所有posts
  let _sql = `SELECT * FROM posts ${ key ? "WHERE title LIKE '%"+key+"%' " : ' '}ORDER BY createTime DESC limit ${pg * size} , ${size * (pg + 1)}`
  return query(_sql)
}

const postDetail = (val) => { // 根据ID 查询 postsDetail
  let _sql = `SELECT * FROM posts WHERE id = ${val}`
  return query(_sql)
}

const commentList = (val) => { // 获取留言列表
  let _sql = `SELECT * FROM comment WHERE postId = ${val} ORDER BY createTime DESC`
  return query(_sql)
}

const createComment = (val) => { // 添加 留言
  let _sql = `INSERT INTO comment (userName, content, postId, avator, createTime) VALUES (?,?,?,?,?)`
  return query(_sql, val)
}

module.exports =  {
  insetUser,
  findUser,
  createPosts,
  postsList,
  updatePosts,
  updatePostsComment,
  updatePostsHot,
  postDetail,
  createComment,
  commentList
}