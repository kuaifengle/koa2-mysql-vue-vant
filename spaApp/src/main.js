// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/Lib.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      baseUrl: 'http://localhost:3001/images/'
    }
  },
  router,
  components: { App },
  template: '<App/>'
})

// router.replace('/edit')
