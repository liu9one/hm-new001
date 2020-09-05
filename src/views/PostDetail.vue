<template>

      <div class="post-detail">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" v-if="false">已关注</div>
        <div class="follow" v-else>关注</div>
      </div>
    </div>
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
        <div class="dianzhan">
          <span class="iconfont icondianzan"></span>
          <span>112</span>
        </div>
        <div class="weixin">
          <span class="iconfont iconweixin"></span>
          <span > 微信</span>
        </div>
      </div>
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
      }
    }
  },
  created () {
    this.getContent()
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
    }
  }
}
</script>
<style lang="less" scoped>
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
  font-size: 18px;
  padding: 15px;

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
    font-size: 16px;
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
  }

</style>
