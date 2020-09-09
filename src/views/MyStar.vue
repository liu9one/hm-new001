<template>
  <div class="my-star">
      <new-header>我的收藏</new-header>
      <div class="list">
          <!-- <div class="item" v-for="item in starList" :key='item.id'>
              <div class="info">
                  <div class="title">
                      {{item.title}}
                  </div>
                  <div class="user">
                      <span >{{item.user.nickname}}</span>
                      <span > &nbsp; {{item.comments.length}}人跟帖</span>
                  </div>
              </div>
              <div class="img">
                  <img :src="$url(item.cover[0].url)" alt="">
              </div>
          </div> -->
          <hm-post :post='item' v-for="item in starList" :key="item.id"></hm-post>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      starList: []
    }
  },
  created () {
    this.getStarList()
  },
  methods: {
    async getStarList () {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.starList = data
        console.log(this.starList)
        this.starList.forEach(item => {
          item.comment_length = item.comments.length
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.item{
    width: 100%;
    height: 70px;
    display: flex;
    padding: 15px;
    border: 1px solid #ccc;
    .img{
        img{
            width: 120px;
            height: 74px;
            object-fit: cover;
        }
    }
    .info{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
            font-size: 16px;
        }
        .user{
            span{
                font-size: 14px;
                color: #ccc;
            }

        }
    }
}
</style>
