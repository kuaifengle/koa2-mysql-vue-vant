const jwt = require('jsonwebtoken');

// 检测是否是有token
module.exports = async ( ctx, next ) => {
    const authorization = ctx.get('Authorization') || '';

    if (authorization) {
        try {
          let tokenContent = await jwt.verify(authorization, 'kuaifengle');     //如果token过期或验证失败，将抛出错误
          console.log(tokenContent)
          ctx.userInfo = tokenContent || {} 
        } catch (err) {
          ctx.body = {
            state: 0,
            msg: err,
            data: []
          }
        }
    }

    await next();
}