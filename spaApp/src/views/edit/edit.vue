<template>
  <div class="editBox">
    <van-nav-bar title="新编文章"  left-text="返回"  left-arrow  @click-left="$router.go(-1)" />
      
    <div class="div10"></div>
    <van-cell-group>
      <van-cell value="标题"  icon="pending-evaluate" />
      <van-field
        v-model="title"
        type="textarea"
        max-length="50"
        placeholder="请输入标题..."
        rows="1"
        autosize
      />
      <div class="div10"></div>
      <van-cell value="内容"  icon="records" />
      <van-field
        v-model="content"
        type="textarea"
        max-length="200"
        placeholder="请输入内容..."
        rows="5"
        autosize
      />
      <div class="div10"></div>
      <div style="height: 50px; "></div>
    </van-cell-group>

    <van-button type="primary" size="large" v-if="!canEdit" class="bottomBtn" @click = "createEdit">新建文章</van-button>

    <van-button type="primary" size="large" v-if="canEdit" class="bottomBtn" @click = "updateEdit">修改文章</van-button>
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        title: '',
        content: '',
        canEdit: false
      }
    },
    mounted () {
      this.id = Number(this.$route.query.id)
      if (this.id) {
        this.getList()
      }
    },
    methods: {
      getList (id) {
        this.loading = true;
        this.$http({
          method: 'GET',
          url: '/postDetail', 
          params:{
          id: this.id
        }
      }).then((res) => {
          if (res.data.state) {
            this.title = res.data.data[0].title;
            this.content = res.data.data[0].content;
            this.canEdit = true
          } else {
            this.Toast('页面出错...')
            this.$router.go(-1)
          }
        })
      },
      updateEdit () {
        this.$http({
          method: 'GET',
          url:'/updatePosts',
          params: {
            id: this.id,
            title: this.title,
            content: this.content
          }
        }).then((res) => {
          if (res.data.state) {
            this.Toast({
              message: res.data.msg,
              iconClass: 'icon icon-success'
            })
            this.$router.replace('/')
          } else {
            this.Toast({
              message: res.data.msg,
              iconClass: 'icon icon-error'
            })
          }
        })
      },
      createEdit () {
        this.$http({
          method: 'GET',
          url:'/createPosts',
          params: {
            title: this.title,
            content: this.content
          }
        }).then((res) => {
          if (res.data.state) {
            this.Toast({
              message: res.data.msg,
              iconClass: 'icon icon-success'
            })
            this.$router.replace('/')
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
  .editBox{
    
  }
  .bottomBtn{position:fixed; bottom:0;}
</style>