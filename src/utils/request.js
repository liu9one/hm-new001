import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'
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
