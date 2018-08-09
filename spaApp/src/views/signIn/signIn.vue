<template>
  <div class="signup">
    <van-nav-bar  left-text="返回"  left-arrow  @click-left="$router.go(-1)" />

    <h2 class="signUp_title tc">登录</h2>

     <div class="div10"></div>
     <van-cell-group>
       <van-field placeholder="请输入用户名" type="text" v-model="username" />
       <van-field  placeholder="请输入密码" type="password" v-model="password"/>
     </van-cell-group>
     <p class="p10"><router-link class="fr" to="/signUp">前往注册</router-link></p>

     <div class="div10"></div>

    <van-button type="default" size="large" class="signup_btn" @click = "signUp">登录</van-button>
  </div>
</template>

<script>
import md5 from 'js-md5'
import cookie from 'js-cookie'

  export default {
    data () {
      return {
        username: '',
        password: '',
        password2: '',
      }
    },
    methods: {
      signUp () {
        if (!this.username) {
          this.Toast('请输入用户名')
          return false
        }
        if (!this.password) {
          this.Toast('2次密码输入不相同')
          return false
        }

        this.$http({
          method: "POST",
          url: '/signIn',
          data: {
            userName: this.username,
            passWord: md5(this.password)
          }
        }).then((res) => {
          if (res.data.state) {
            this.Toast({
              message: res.data.msg,
              iconClass: 'icon icon-success'
            })
            cookie.set('assent_token', res.data.token, { expires: 1, path: '' })
            if (this.$route.query.redirect) {
              this.$router.replace(this.$route.query.redirect)
            } else {
              this.$router.replace('/')
            }
          } else {
            this.Toast({
              message: res.data.msg,
              iconClass: 'icon icon-error'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.signUp_title{font-size:16px; font-weight:bold; text-align: center; padding: 1.333333rem 0 1.333333rem; color:#333;}

</style>