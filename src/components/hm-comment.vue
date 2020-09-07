<template>
  <div class="hm-comment">
      <div class="header">
          <div class="avatar">
          <img :src="$base + comment.user.head_img" alt="">
      </div>
      <div class="user">
          <p>{{comment.user.nickname}}</p>
          <p>{{comment.create_date | timeNow}}</p>
      </div>
      <div class="right" @click="reply">
          <span>回复</span>
      </div>
      </div>
      <hm-floor class="first" :count= 'count' @reply='onReply'  :comment= 'comment.parent' v-if="comment.parent"></hm-floor>
      <div class="content">
          {{comment.content}}
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: this.getCount(0, this.comment)
    }
  },
  props: {
    comment: Object
  },
  methods: {
    getCount (num, data) {
      if (data.parent) {
        return this.getCount(num + 1, data.parent)
      } else {
        return num
      }
    },
    // 向父组件发送评论nickname,和评论的id
    reply () {
      console.log(this.comment.user.nickname, this.comment.id)
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    },
    onReply (id, nickname) {
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang='less' scoped>
// .first{
//     border-bottom: 1px solid #cccccc;
// }
.hm-comment{
    margin-top: 30px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    padding: 15px;
.header{
    display: flex;
    align-items: center;
    font-size: 16px;

    .avatar{
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
            object-fit: cover;
        }
    }
    .user{
        flex: 1;
        font-size: 14px;
        line-height: 20px;
        color: #999;
        text-align: left;
    }
}
.right{
    font-size: 14px;
    color: #999;
}
.content{
    margin-top: 20px;
    font-size: 16px;
    text-align: left;
}
}
</style>
