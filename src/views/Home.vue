<template>
  <div class="home">
    <div class="header">
        <div class="logo">
            <span class="iconfont iconnew"></span>
        </div>
        <div class="search">
            <span class="iconfont iconsearch"></span>
            <span > 搜索新闻</span>
        </div>
        <div class="user">
            <span class="iconfont iconwode"></span>
        </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable >
        <van-tab :title="tab.name" v-for="tab in categoryList" :key="tab.id">
          <hm-post :post='item' v-for="item in newsList" :key='item.id'></hm-post>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      categoryList: [],
      pageIndex: 1,
      pageSize: 10,
      newsList: []
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.categoryList = data
        console.log(this.categoryList)
        this.getNewsList(this.categoryList[0].id)
      }
    },
    async getNewsList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = data
        console.log(this.newsList)
      }
    }
  }
}
</script>

<style lang='less' scoped>
 .header{
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #ff1100;
  color: #ffffff;
  .logo,
  .user{
      width: 60px;
      text-align: center;
      line-height: 50px;
  }
  .logo{
      span{
          font-size: 50px;
      }
  }
  .user{
      span{
          font-size: 24px;
      }
  }
  .search{
      flex: 1;
      width: 156px;
      height: 34px;
      line-height: 34px;
      background-color: rgba(255, 255, 255, .5);
      border-radius: 18px;
      font-size: 16px;
      text-align: center;
      margin-top: 8px;
  }
}

</style>
