import Vue from 'vue'
// 引入 moment
import moment from 'moment'

// 全局语言设置
moment.locale('zh-CN')
// 注册全局过滤器
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.filter('timeNow', input => {
  return moment(input).fromNow()
})
