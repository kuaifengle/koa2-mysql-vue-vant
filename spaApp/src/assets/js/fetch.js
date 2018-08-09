import axios from 'axios'
import NProgress from 'nprogress'
import cookie from 'js-cookie'
import 'nprogress/nprogress.css'

var instance = axios.create();
NProgress.configure({ showSpinner: false });

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.baseURL = 'http://localhost:3001'

// http request 拦截器
instance.interceptors.request.use(
  config => {
      config.withCredentials = true 
      NProgress.start()
      config.headers['Authorization'] = cookie.get('assent_token') || ''; // 设置assent_token
      return config;
  },
  err => {
      return Promise.reject(err);
  });
 
// http response 拦截器
instance.interceptors.response.use(
  response => {
      NProgress.done()
      if (response.data.msg === "用户登录验证失效") {
        cookie.remove('assent_token')
      }
      return response;
  },
  error => {
      NProgress.done()
      return Promise.reject(error)
  });

export default instance

