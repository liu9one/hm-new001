<template>

      <div class="post-detail">
        <van-sticky>
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" @click="unfollow" v-if="content.has_follow">已关注</div>
        <div class="follow" @click="follow" v-else>关注</div>
      </div>
    </div>
    </van-sticky>
    <div class="content">
      <h4 class="title">{{content.title}}</h4>
      <div class="user">
        <span>{{content.user.nickname}}</span>&nbsp;
        <span>{{content.create_date | time}}</span>
      </div>
      <div class="info" v-if="content.type===1" v-html="content.content">
      </div>

        <video v-else-if="content.type===2" :src="getUrl(content.content)" controls autoplay muted></video>

      <div class="btns">
        <div class="dianzhan" @click="like" :class="{activeZan: content.has_like}">
          <span  class="iconfont icondianzan" ></span> &nbsp;
          <span>{{content.like_length}}</span>
        </div>
        <div class="weixin">
          <span class="iconfont iconweixin"></span>
          <span > 微信</span>
        </div>
      </div>
    </div>
     <!-- 评论u部分  -->
      <div class="comment-list">
        <h3 >精彩跟帖</h3>
        <hm-comment :comment='comment' v-for="comment in commentList" :key='comment.id'></hm-comment>
      </div>
    <div class="footer">
        <div class="search">
          <input type="text" placeholder="回复">
        </div>
        <span class="iconfont iconpinglun-"><i>200</i></span>
        <span class="iconfont iconshoucang " @click="star" :class="{activeStar: content.has_star}"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: {
        user: {

        }
      },
      commentList: []
    }
  },
  created () {
    this.getContent()
    // 获取评论列表
    this.getCommentList()
  },
  methods: {
    async getContent () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.content = data
        console.log(data)
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    // 封装判断是否登录的函数
    noLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有回到login
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        return false
      }
    },
    // follow 关注
    async follow () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.content.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getContent()
      }
    },
    async unfollow () {
      const res = await this.$axios.get(`/user_unfollow/${this.content.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('已取关')
        this.getContent()
      }
    },
    async like () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.content.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('点赞成功')
        this.getContent()
      }
    },
    async star () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.content.id}`)
      if (res.data.statusCode === 200) {
        console.log(res.data)
        this.$toast.success(res.data.message)
        this.getContent()
      }
    },
    async getCommentList () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    }
  }

}

</script>
<style lang="less" scoped>
/deep/.van-sticky{
  background-color: #fff;
}
.header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  .left {
    span {
      line-height: 50px;
    }
  }
  .center {
    flex: 1;
    span {
      font-size: 50px;
    }
  }
  .right {
    font-size: 14px;
    div {
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
    }
    .followed {
      border: 1px solid #ccc;

    }
    .follow {
      color: #fff;
      background-color: #f00;
    }
  }
}
.content{
  width: 100%;
  font-size: 18px;
  padding: 15px;
  border-bottom:3px #ccc solid;

    video{
      width: 100%;
    }
  }
  .user{
    font-size: 14px;
    color: #ccc;
    margin: 20px 0;
  }
  .info{
    width: 100%;
    font-size: 16px;
    img{
      width: 100%;
    }

  }
  .btns{
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    >div{
      border: 1px solid #ccc;
      width: 72px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      font-size: 14px;
      .iconweixin{
        color: limegreen;
      }
    }
     .activeZan{
        border: 1px solid red;
        .iconfont{
          color:red;
        }
      }
  }
.footer{
  display: flex;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  background-color: #fff;
  .iconfont{
    font-size: 24px;
  }
  .activeStar{
    color: red;
  }
  .iconpinglun-{
    position: relative;
    i{
      position: absolute;
      right: -5px;
      top:0;
      background-color:red;
      font-size: 10px;
      color: #fff;
      border-radius: 5px;
      font-style: normal;
    }
  }
  .search{
    width: 180px;
    padding-right: 10px;
    input{
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      width: 100%;
      border: none;
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
.comment-list{
  text-align: center;
}
.post-detail{
  padding-bottom: 50px;
}
</style>
