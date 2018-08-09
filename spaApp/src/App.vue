<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // this.$http('/').then((res) => {
    //   console.log(res)
    // })
  }
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/common.css';
@import './assets/css/app.css';
</style>
