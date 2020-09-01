import Vue from 'vue'
// 引入 moment
import moment from 'moment'

// 注册全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
