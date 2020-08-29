import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
// 引入vant
import Vant from 'vant'
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
