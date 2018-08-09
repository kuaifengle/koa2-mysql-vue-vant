<template>
  <div class="signup">
    <van-nav-bar  left-text="返回"  left-arrow  @click-left="$router.go(-1)" />

    <h2 class="signUp_title tc">注册</h2>

    <div class="avator_box tc">
      <div class="selectImg">
        <img v-if="imageSrc" :src="imageSrc" alt="">
        <img v-else src="../../assets/image/user.png" alt="">
        <input type="file" value="选择头像" @change="selectAvator">
      </div>
      <span>点击选择头像</span>
    </div>

     <div class="div10"></div>
     <van-cell-group>
       <van-field required placeholder="请输入用户名" type="text" v-model="username" />
       <van-field required placeholder="请输入密码" type="password" v-model="password"/>
       <van-field required placeholder="请重复输入密码" type="password" v-model="password2"/>
     </van-cell-group>
     <p class="p10"><router-link class="fr" to="/signIn">前往登录</router-link></p>

     <div class="div10"></div>

     <van-button type="default" size="large" class="signup_btn" @click = "signUp">注册</van-button>
  </div>
</template>

<script>
import md5 from 'js-md5'

  export default {
    data () {
      return {
        imageSrc: '',
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
        if (this.password !== this.password2 && !this.password) {
          this.Toast('2次密码输入不相同')
          return false
        }

        this.$http({
          method: "POST",
          url: '/signUp',
          data: {
            userName: this.username,
            passWord: md5(this.password),
            repeatPass: md5(this.password2),
            avator: this.imageSrc,
            createTime: new Date().getTime()
          }
        }).then((res) => {
          if (res.data.state) {
            this.Toast({
              message: res.data.msg,
              iconClass: 'icon icon-success'
            })
            this.$router.replace('signIn')
          } else {
            this.Toast({
              message: res.data.msg,
              iconClass: 'icon icon-error'
            })
          }
        })
      },
      selectAvator (ev) {
        var file = ev.target.files[0];
        var reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
        }
        reader.readAsDataURL(file)
      }
    }
  }
</script>

<style scoped>
.signUp_title{font-size:16px; font-weight:bold; padding: 1.333333rem 0 1.333333rem; color:#333;}

</style>