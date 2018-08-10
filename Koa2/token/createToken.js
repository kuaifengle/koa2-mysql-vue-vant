const jwt = require('jsonwebtoken');

// 创建token
//登录时：核对用户名和密码成功后，应用将用户的id 作为JWT Payload的一个属性
module.exports = function(user){
    const token = jwt.sign({
        userId: user.id,
        userName: user.userName,
        avator: user.avator
    }, 'kuaifengle', {    // "kuaifengle"  是校验码    解析时需要一致 才能取到 user 信息
        expiresIn: '24h' //过期时间设置为24h 格式有(s, m, h , day)。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    });
    return token;
};