import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit'
import MyFollow from '../views/MyFollow'
import MyComment from '../views/MyComment'
import MyStar from '../views/MyStar.vue'
Vue.use(VueRouter)

// 全局的把push的异常给处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'rigister' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/my-follow', component: MyFollow, name: 'my-follow' },
  { path: '/my-comment', component: MyComment, name: 'my-comment' },
  { path: '/my-star', component: MyStar, name: 'my-star' }
]

const router = new VueRouter({
  routes
})

// 设置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const allUrl = ['user', 'user-edit', 'my-follow']
  if (!allUrl.includes(to.name) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
