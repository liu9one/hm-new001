<template>
  <div class="user-edit">
      <new-header>编辑信息</new-header>
      <div class="avatar">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <van-uploader :after-read="afterRead" />
      </div>

      <nav-item @click='showNickname' >
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
        <!-- 给输入框一个标记 在修改输入框弹出式自动获得焦点 -->
           <van-field
    placeholder="输入昵称"
   v-model="nickname"
  ref='nickname'
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
   ref='password'
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

      <!-- 剪裁的模态框  -->
       <div class="mask"  v-show='isshowMask'>
         <div class="choose">
           <van-button class="cancel" @click='isshowMask = false' size="small" type="">取消</van-button>
           <van-button class="crop" @click='crop' size="small" type="primary">修改</van-button>
         </div>
         <vueCropper
  ref="giao"
  :img='img'
  autoCrop
  autoCropWidth="100"
  autoCropHeight="100"
  fixed
></vueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
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
      gender: 1,
      isshowMask: false,
      img: ''
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
    async showNickname () {
      this.isshownickname = true
      this.nickname = this.user.nickname
      await this.$nextTick
      this.$refs.nickname.focus()
    },
    updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    async showPassword () {
      this.isshowPassword = true
      this.password = this.user.password
      await this.$nextTick
      this.$refs.password.focus()
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
    },
    // 判断图片的类型和大小
    isImg (name) {
      if (name) {
        if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('jpeg')) {
          return true
        } else {
          return false
        }
      }
    },
    // 修改头像
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file, file.file)
      if (!this.isImg(file.file.name)) {
        return this.$toast('图片格式不正确')
      }
      if (file.file.size > 500 * 1024) {
        return this.$toast('上传图片过大')
      }
      this.isshowMask = true
      this.img = file.content
    },
    crop () {
      this.$refs.giao.getCropBlob(async blob => {
        console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
        // console.log(data)
          this.updateUser({ head_img: data.url })
        }
        this.isshowMask = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.avatar{
    text-align: center;
    padding: 30px;
    position: relative;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .van-uploader{
      width: 100px;
      height: 100px;
      position:absolute;
      transform: translateX(-50%);
      top: 0;
      left:50%;
      top: 30px;
      background-color: pink;
      opacity: 0;
    }
}
/deep/ .van-dialog__content{
    padding: 10px;
    .van-field{
        border: 1px solid #ccc;
    }
}
.mask{
  width: 100%;
  height: 100%;
  background-color: pink;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .choose{
       position: fixed;
       padding: 5px;
    width: 100%;
    height: 30px;
    background-color: #ccc;
    top: 0;
    z-index: 1;
    .cancel,
    .crop{
      border-radius: 5px;
    }
    .cancel{
     background-color: #fff;
    }
    .crop{
      margin:0px 15px 0 0;
    float: right;
    }

  }
}

</style>
