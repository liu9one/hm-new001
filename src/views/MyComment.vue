<template>
  <div class="my-comment">
     <new-header></new-header>
     <div class="list">
     <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
       <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
>
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
      </van-list>
    </van-pull-refresh>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      loading: false,
      finished: false,
      pageSize: 8,
      pageIndex: 1,
      refreshing: false
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    async getComment () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        console.log(this.commentList)
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getComment()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.pageIndex = 1
        this.commentList = []
        this.getComment()
        this.finished = false
        this.loading = true
      }, 1000)
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
