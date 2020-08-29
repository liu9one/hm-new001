<template>
  <div class="user">
      <div class="header">
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
  <nav-item to='/follow'>
      <template >我的关注</template>
      <template #content>关注的人</template>
  </nav-item>
  <nav-item>
      <template>我的跟帖</template>
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
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // console.log(token, userId)
    // 向后台请求user的数据 token 必须放到请求头中
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    console.log(res)
    const { statusCode, data, message } = res.data
    if (statusCode === 200) {
      this.user = data
    //   this.$toast(message)
    } else if (statusCode === 401) {
      this.$toast(message)
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
