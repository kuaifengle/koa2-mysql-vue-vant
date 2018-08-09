<template>
  <div>
    <van-nav-bar />
    <van-nav-bar  title="文章列表" fixed  @click-right="$router.push('/edit')" @click-left="signOut">
      <span name="edit" slot="left" v-if="isSignIn" style="color:#38f;">登出</span>
      <van-icon name="edit" slot="right" />
    </van-nav-bar>

    <van-search placeholder="请输入文章名称" v-model="searchTitle"  :show-action="!!searchTitle"  @search="onSearch" @blur="onSearch">
      <div style="padding: 0 8px" slot="action" @click="onSearch">搜索</div>
    </van-search>

    <van-cell-group>
      <van-nav-bar v-if="!postList.length" title="暂无文章,快去发一篇吧!" />

      <van-list v-model="loading" :immediate-check="false" :offset="20" :finished="finished" @load="onLoad" >
        <van-cell  v-for="(item, index) in postList" :key="index" :title="item.title" :value="'作者:'+ item.userName" :label="item.content.substring(0, 10) + '...'" @click="$router.push({path:'/postPage',query: {id: item.id }})" >
        </van-cell>
      </van-list>
    </van-cell-group>

  </div>
</template>

<script>
import { Dialog } from 'vant';
import cookie from 'js-cookie'

export default {
  data () {
    return {
      postList: [],
      searchTitle: '',
      loading: false,
      finished: false,
      pg: 1,
      size: 10,
      isSignIn: false
    }
  },
  mounted () {
    this.getList(false)
    if (cookie.get('assent_token')) {
      this.isSignIn = true
    } else {
      this.isSignIn = false
    }
  },
  methods: {
    getList (boolean) {
      this.loading = true;
      this.$http({
        method: 'GET',
        url: '/postsList', 
        params:{
        title: this.searchTitle,
        pg: this.pg,
        size: this.size
      }
    }).then((res) => {
        if (res.data.state) {
          if (res.data.data.length < this.size && !boolean) {
            this.postList = this.postList.concat(res.data.data);
            this.finished = true;
          } else {
            if (boolean) {
              this.postList = res.data.data
            } else {
              this.postList = this.postList.concat(res.data.data);
            }
          }
        }
        this.loading = false;
      })
    },
    onSearch () {
      this.pg = 1;
      this.getList(true)
    },
    onLoad () {
        this.loading = true;
      setTimeout(() => {
        this.pg ++
        this.getList(false)
      }, 2000)
    },
    signOut () {
      Dialog.confirm({
        title: '登出',
        message: '确定要登出吗?'
      }).then(() => {
        cookie.remove('assent_token')
        this.isSignIn = false
        this.Toast('你已登出!')
      }).catch(() => {
        this.Toast('你已取消操作!')
      });
    }
  }
}
</script>

<style scoped>
.van-nav-bar--fixed{z-index:10 !important;}

</style>
