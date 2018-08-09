import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie'
import Index from '../views/index/index.vue'
import signUp from '../views/signUp/signUp.vue'
import signIn from '../views/signIn/signIn.vue'
import edit from '../views/edit/edit.vue'
import postPage from '../views/postPage/postPage.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: signUp,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: signIn,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: edit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/postPage',
      name: 'PostPage',
      component: postPage,
      meta: {
        requireAuth: false
      }
    }
  ],
  linkActiveClass: 'on'
})

router.beforeEach((to, from, next) => {
  let token = cookie.get('assent_token');
  
  if(to.meta.requireAuth){
    if(token){
      next();
    }else{
      next({
        path: '/signIn',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }else{
    next();//如果无需token,那么随它去吧
  }
});

export default router

