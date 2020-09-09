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
    <div class="content" @click="onBlur">
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
        <hm-comment :comment='comment'
         @reply='onReply'
         v-for="comment in commentList"
          :key='comment.id'>
          </hm-comment>
      </div>
      <div class="footer-textrea" v-if="isshowTextarea">
        <textarea :placeholder="'回复 :'+ nickname" ref="textarea" v-model="txtcontent" ></textarea>
        <van-button type="primary"  @click="publish" >发送</van-button>
      </div>
    <div class="footer" v-else>
        <div class="search">
          <input type="text" @focus="onFocus" placeholder="回复">
        </div>
        <span class="iconfont iconpinglun-"><i>{{content.comment_length}}</i></span>
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
      commentList: [],
      isshowTextarea: false,
      txtcontent: '',
      nickname: '',
      replyId: ''
    }
  },
  created () {
    this.getContent()
    // 获取评论列表
    this.getCommentList()
    // 给bus注册事件
    // console.log(this.$bus)
    this.$bus.$on('reply', this.onReply)
  },
  beforeDestroy () {
    this.$bus.$off('reply', this.onReply)
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
    },
    // 文本框获得焦点
    async onFocus () {
      this.isshowTextarea = true
      await this.$nextTick
      this.$refs.textarea.focus()
    },
    // 发送回复内容
    async publish () {
      if (this.txtcontent.trim() === '') return this.$toast('评论不能为空')
      const res = await this.$axios.post(`/post_comment/${this.content.id}`, {
        content: this.txtcontent,
        parent_id: this.replyId
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.txtcontent = ''
        this.replyId = ''
        this.nickname = ''
        this.isshowTextarea = false
      }
    },
    // 接收到子组件的数据后 操作弹出textarea 回显nickname
    async onReply (id, nickname) {
      console.log(id, nickname)
      this.isshowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
      this.nickname = '@' + nickname
      this.replyId = id
    },
    onBlur () {
      this.isshowTextarea = false
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
   /deep/ img{
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
      border-radius: 7px;
      font-style: normal;
      padding: 0 5px;
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
.footer-textrea{
  height: 70px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around ;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  z-index: 999;
  border-top: 1px solid #666;
  textarea{
    width: 260px;
    height: 100%;
    padding: 5px;
    border: none;
    border-radius: 15px;
    font-size: 14px;
    text-indent: 1.5em;
    background-color: #eee;
  }
}
</style>
