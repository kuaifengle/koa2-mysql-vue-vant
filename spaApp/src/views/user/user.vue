<template>
  <div>
    <van-nav-bar  title="用户中心" fixed  @click-right="$router.push('/edit')">
      <van-icon name="setting" slot="right" />
    </van-nav-bar>

<!-- 'http://localhost:3001/images/'+ userInfo.avator + '.png'  -->


    <v-nav></v-nav>
  </div>
</template>

<script>
import appNav from '../../components/nav.vue'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getToDay() {
      var date = new Date();
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' / ' + (date.getHours() < 12 ? 'AM' : 'PM')
    },
    getUserInfo () {
      this.$http.get('/userDetail').then((res) => {
        if (res.data.state) {
          this.userInfo = res.data.data[0]
        }
      })
    }
  },
  components: {
    'v-nav': appNav
  }
}
  
</script>

<style>

</style>