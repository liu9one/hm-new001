<template>
  <div class="user">
      <div class="header" @click='$router.push("/user-edit")'>
          <div class="avatar">
              <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          </div>
    <div class="info">
        <div class="name">
          <span class="iconfont " :class="user.gender === 1 ? 'iconxingbienan' : 'iconxingbienv' "></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">
         {{user.create_date | time }}
        </div>
      </div>
      <div class="arrow">
          <span class="iconfont iconjiantou1"> </span>
      </div>
  </div>
  <nav-item to='/my-follow'>
      <template >我的关注</template>
      <template #content>关注的人</template>
  </nav-item>
  <nav-item to='/my-comment'>
      <template >我的跟帖</template>
      <template #content>回复/跟帖</template>
  </nav-item>
  <nav-item>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
  </nav-item>
  <nav-item>
      <template>设置</template>
      <!-- <template #content></template> -->
  </nav-item>
  <!-- 退出功能框 -->
      <div class="logout" style="padding:10px" @click='logout'>
          <van-button type="danger" block>退出登录</van-button>
      </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  async created () {
    const userId = localStorage.getItem('userId')
    // console.log(token, userId)
    // 向后台请求user的数据 token 必须放到请求头中
    const res = await this.$axios.get(`/user/${userId}`, {
    })
    console.log(res)
    const { statusCode, data, message } = res.data
    if (statusCode === 200) {
      this.user = data
    //   this.$toast(message)
    } else if (statusCode === 401) {
      this.$toast(message)
    }
  },
  methods: {
    async logout () {
      // console.log('123')
      // 弹框提示
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗?'
        })

        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  }

}
</script>

<style lang='less' scoped>
.user {
  .header {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 3px solid #ddd;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      padding-left: 10px;
      font-size: 14px;
      .time {
        margin-top: 10px;
        color: #666;
      }
      .iconxingbienan {
        color: #7bbcec;
      }
      .iconxingbienv {
          color:pink
      }
    }
  }
}
</style>
