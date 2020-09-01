import Vue from 'vue'
// 引入 moment
import moment from 'moment'

// 注册全局过滤器
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
