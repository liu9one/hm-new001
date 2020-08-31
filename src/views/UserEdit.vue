<template>
  <div class="user-edit">
      <new-header>编辑信息</new-header>
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <nav-item @click='showNickname'>
          <template> 昵称 </template>
          <template #content> {{user.nickname}} </template>
      </nav-item>
      <nav-item @click='showPassword'>
          <template > 密码 </template>
          <template #content> ****** </template>
      </nav-item>
      <nav-item @click='showGender'>
          <template > 性别 </template>
          <template #content> {{user.gender === 1 ? '男' : '女' }} </template>
      </nav-item>

      <!-- 弹出修改框组件  -->
      <van-dialog
        use-slot
        title="修改昵称"
        show-cancel-button
        confirm-button-open-type="getUserInfo"
        bind:close="onClose"
        bind:getuserinfo="getUserInfo"
        v-model="isshownickname"
        @confirm='updateNickname'
        >
           <van-field
    placeholder="输入昵称"
   v-model="nickname"
   focus
  />
      </van-dialog>
      <van-dialog
        use-slot
        title="修改密码"
        show-cancel-button
        confirm-button-open-type="getUserInfo"
        bind:close="onClose"
        bind:getuserinfo="getUserInfo"
        v-model="isshowPassword"
        @confirm='updatePassword'
        >
          <van-field
    placeholder="输入密码"
   v-model="password"
   focus
  />
      </van-dialog>
       <van-dialog
        use-slot
        title="修改性别"
        show-cancel-button
        confirm-button-open-type="getUserInfo"
        bind:close="onClose"
        bind:getuserinfo="getUserInfo"
        v-model="isshowGender"
        @confirm='updateGender'
        >
     <van-radio-group v-model="gender" bind:change="onChange">
  <van-cell-group>
    <van-cell title="男" clickable data-name="1" bind:click="onClick">
      <van-radio slot="right-icon" :name="1" />
    </van-cell>
    <van-cell title="女" clickable data-name="0" bind:click="onClick">
      <van-radio slot="right-icon" :name="0" />
    </van-cell>
  </van-cell-group>
</van-radio-group>
      </van-dialog>
  </div>
</template>

<script>
export default {

  created () {
    this.getUserInfo()
  },
  data () {
    return {
      user: '',
      isshownickname: false,
      nickname: '',
      isshowPassword: false,
      password: '',
      isshowGender: false,
      gender: 1
    }
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
        console.log(this.user)
      }
    },
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    // 显示修改昵称框
    showNickname () {
      this.isshownickname = true
      this.nickname = this.user.nickname
    },
    updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    showPassword () {
      this.isshowPassword = true
      this.password = this.user.password
    },
    updatePassword () {
      this.updateUser({ password: this.password })
    },
    showGender () {
      this.isshowGender = true
      this.gender = this.user.gender
    },
    updateGender () {
      this.updateUser({ gender: this.gender })
    }

  }
}
</script>

<style lang='less' scoped>
.avatar{
    text-align: center;
    padding: 30px;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
}
/deep/ .van-dialog__content{
    padding: 10px;
    .van-cell{
        border: 1px solid #ccc;
    }
}
</style>
