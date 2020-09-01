<template>
  <div class="my-follow">
      <new-header> 我的关注 </new-header>
      <div class="list">
          <div class="item" v-for="item in list" :key='item.id'>
              <div class="avatar">
                  <img :src="$base + item.head_img" alt="">
              </div>
              <div class="info">
                  <p class="name"> {{item.nickname}} </p>
                  <p class="time"> {{item.create_date | time}}</p>
              </div>
              <div class="unfollow">
                  <van-button size='small' @click="unFollow(item.id)" type="danger">取消关注</van-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getMyFollow()
  },
  methods: {
    async getMyFollow () {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    },
    async unFollow (id) {
      try {
        await this.$dialog.confirm({
          title: '标题',
          message: '弹窗内容'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('已取关')
        this.getMyFollow()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.list{
    .item{
        display: flex;
        align-items: center;
        padding: 15px;
        .info{
            flex:1;
            .name{
                font-size: 18px;
            }
            .time{
                margin-top: 5px;
                font-size: 14px;
                color: rgb(100, 99, 99);
            }
        }
        .avatar{
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
}
</style>
