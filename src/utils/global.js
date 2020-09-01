import Vue from 'vue'
// 全局注册组件
import newHeader from '../components/new-header'
import newLogo from '../components/new-logo'
import navItem from '../components/nav-item'

Vue.component('new-logo', newLogo)
Vue.component('new-header', newHeader)
Vue.component('nav-item', navItem)
