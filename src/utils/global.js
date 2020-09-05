import Vue from 'vue'
// 全局注册组件
import newHeader from '../components/new-header'
import newLogo from '../components/new-logo'
import navItem from '../components/nav-item'
import hmPost from '../components/hm-post.vue'
import hmComment from '../components/hm-comment.vue'
import hmFloor from '../components/hm-floor.vue'

Vue.component('new-logo', newLogo)
Vue.component('new-header', newHeader)
Vue.component('nav-item', navItem)
Vue.component('hm-post', hmPost)
Vue.component('hm-comment', hmComment)
Vue.component('hm-floor', hmFloor)
