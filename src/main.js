import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
// 引入vant
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 引入 amfe-flexible 来处理自适应 安装一个依赖包postcss-pxtorem
import 'amfe-flexible'
import axios from 'axios'
// 引入 moment
import moment from 'moment'

// 全局注册组件
import newHeader from './components/new-header'
import newLogo from './components/new-logo'
import navItem from './components/nav-item'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// 设置请求拦截
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token')
  if (token) {
    // console.log('请求了', config)
    config.headers.Authorization = token
  }
  return config
})
// 设置响应拦截解决token过期
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.push('/login')
    Toast.fail(message)
  }
  // 对响应数据做点什么
  return response
})
// 注册全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
Vue.component('new-logo', newLogo)
Vue.component('new-header', newHeader)
Vue.component('nav-item', navItem)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
