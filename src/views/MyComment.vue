<template>
  <div class="my-comment">
     <new-header></new-header>
     <div class="list">
         <div class="item" v-for='item in commentList' :key="item.id">
             <div class="time">
                 <p>{{item.create_date | time('YYYY-MM-DD HH:mm')}}</p>
             </div>
             <div class="comment" v-if='item.parent'>
                 <div class="name">{{item.parent.user.nickname}}</div>
                 <div class="comment_content">{{item.parent.content}}</div>

             </div>
             <div class="content"> {{item.content}}</div>
             <div class="origin">
                 <span>原文: {{item.post.title}}</span>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: []
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    async getComment () {
      const res = await this.$axios.get('/user_comments')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.item{
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    font-size: 14px;
    .time{
        font-size: 14px;
        color: #666;
        padding: 10px 0;
    }
    .comment{
        background-color: #ddd;
        padding: 10px;
        .name{
            color: #666;
            font-size: 14px;
        }
        .comment_content{
            color: #999;
            line-height: 30px;
            margin-top: 20px;
        }
    }
    .origin{
        font-size: 14px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }
}
</style>
