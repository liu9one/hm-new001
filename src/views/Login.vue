<template>
 <div class="login">
     <new-header>登录</new-header>
     <new-logo></new-logo>
      <van-form @submit="login">
  <van-field
    v-model="username"
    label="用户名"
    placeholder="用户名"
    :rules=rules.username
  />
  <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="密码"
    :rules=rules.password
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
  <div class="tips">
        <p>还没有账号? <router-link to="/register">注册</router-link></p>
    </div>
</van-form>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    const { password, username } = this.$route.params
    console.log(this.$route)
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      const res = await axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        if (this.$route.query.back) {
          this.$router.back()
        } else {
          this.$router.push('./user')
          this.$toast(message)
        }
      } else {
        this.$toast(message)
      }
    }
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        password: [{ required: true, message: '请填写密码', trigger: 'onChange' }, { pattern: /^\d{3,9}$/, message: '密码必须是3-9位', trigger: 'onChange' }
        ],
        username: [{ required: true, message: '请填写用户名', trigger: 'onChange' }, { pattern: /^\d{5,11}$/, message: '用户名必须是5-11位', trigger: 'onChange' }
        ]
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .tips{
        font-size: 16px;
        text-align: right;
        margin: 15px;
        a{
            color: royalblue;
        }
    }
</style>
