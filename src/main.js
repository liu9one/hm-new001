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

// 全局注册组件
import newHeader from './components/new-header'
import newLogo from './components/new-logo'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.component('new-logo', newLogo)
Vue.component('new-header', newHeader)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
