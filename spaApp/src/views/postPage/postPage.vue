<template>
  <div>
    <van-nav-bar  title="文章详情" left-text="返回"  left-arrow  @click-left="$router.go(-1)"  @click-right="$router.push({path: '/edit', query: {id: id}})">
      <van-icon v-if="detail.isMyself" name="edit" slot="right" />
    </van-nav-bar>
    
    <van-panel>
        <div slot="header" class="clearfix detail_header">
          <van-row>
            <van-col span="24" class="detail_title">
              <p>{{detail.title}}</p>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12" class="detail_info">
              <p>
                {{`创建时间:${timestampToTime(detail.createTime)}`}}
              </p>
              <p>
                <span style="margin-right:10px;">
                  <van-icon name="browsing-history" />
                  {{detail.hot}}
                </span>

                <span>
                  <van-icon name="other-pay" />
                  {{detail.comments}}
                </span>
              </p>
            </van-col>
            <van-col span="12" class="author">
              <img  v-if="detail.avator" :src="$root.baseUrl + detail.avator + '.png'" alt="">
              <span>{{'作者: ' + detail.userName}}</span>
            </van-col>
          </van-row>
        </div>

      <div class="content_box">
        {{detail.content}}
      </div>
      <div slot="footer" style="padding:0 !important; ">
        <van-field  v-model="content" type="textarea" row="2" max-length="100" placeholder="请输入评论..." >
          <van-button slot="button" type="primary" plain size="normal" @click="createComment">发言</van-button>
        </van-field>

        <!-- 留言 -->
        <van-cell-group v-if="commentList.length">
          <van-nav-bar  :title="'留言('+ detail.comments+ ')'" />
          <van-cell v-for="(item, index) in commentList":key="index" :title="item.userName" :value="timestampToTime(item.createTime)" :label="item.content" />
        </van-cell-group>
      </div>
    </van-panel>

  </div>
</template>

<script>

export default {
  data () {
    return {
      id: '',
      detail: {},
      content: '',
      commentList: []
    }
  },
  mounted () {
      this.id = Number(this.$route.query.id)
    if (!this.id) {
      this.Toast('文章获取错误')
      return false
    } else {
      this.init()
    }
  },
  methods: {
    init () {
      this.getList()
      this.getAllCommentList()
    },
    getList () {
      this.loading = true;
      this.$http({
        method: 'GET',
        url: '/postDetail', 
        params:{
        id: this.id
      }
    }).then((res) => {
        if (res.data.state) {
          this.detail = res.data.data[0]
        }
      })
    },
    timestampToTime (timestamp) {
        let date = new Date(timestamp - 0);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    createComment () {
      this.$http({
        method: 'GET',
        url: '/createComment',
        params: {
          id: this.id,
          content: this.content
        }
      }).then((res) => {
        if (res.data.state) {     
          this.content = '' 
          this.init()
        } else {
          this.Toast(res.data.msg)
        }
      })
    },
    getAllCommentList () {
      this.$http({
        method: 'GET',
        url: '/commentList',
        params: {
          id: this.id
        }
      }).then((res) => {
        if (res.data.state) {      
          this.commentList = res.data.data
        } else {
          this.Toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.detail_header {border-bottom:1px solid #ededed; padding:10px; }
.detail_title p{font-size:16px;  line-height: 0.8rem; }
.detail_info p, .van-cell__title div{line-height:0.7rem;}
.author{ height:1.4rem; text-align:right;}
.author img{width:1rem; height:1rem; vertical-align: middle; border-radius: 50%; padding: 0.2rem;}
.content_box{
  padding: 10px;
  text-indent: 2em;
  min-height: 50vh;
}
</style>
