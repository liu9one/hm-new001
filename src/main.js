import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'

// 引入 amfe-flexible 来处理自适应 安装一个依赖包postcss-pxtorem
import 'amfe-flexible'

// 导入request请求模块
import './utils/request'
// 导入筛选模块
import './utils/filters'
// 导入全局模块global
import './utils/global'
// 导入vant
import './utils/vant'

Vue.config.productionTip = false

const bus = new Vue()
// 把bus 挂到vue原型上
Vue.prototype.$bus = bus
bus.$on('reply', function () {
  console.log('bus的reply')
})
window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
