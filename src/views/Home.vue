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
        <div class="user" @click="$router.push('/user')">
            <span class="iconfont iconwode"></span>
        </div>
    </div>
    <van-sticky class="van-more">
 <div class="more" @click="$router.push('/manage')">
      <span class="iconfont iconlianjie">
      </span>
    </div>
</van-sticky>
    <van-tabs v-model="active" sticky animated swipeable >
        <van-tab :title="tab.name" v-for="tab in categoryList" :key="tab.id">
           <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <hm-post :post='item' v-for="item in newsList" :key='item.id'></hm-post>
          </van-list>
          </van-pull-refresh>
        </van-tab>

    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      categoryList: [],
      pageIndex: 1,
      pageSize: 7,
      newsList: [],
      loading: false,
      finished: false,
      refreshing: false

    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.categoryList = activeList
        this.getNewsList(this.categoryList[0].id)
        return
      }
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
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      this.pageIndex++
      this.getNewsList(this.categoryList[this.active].id)
    },
    onRefresh () {
      this.newsList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getNewsList(this.categoryList[this.active].id)
    }
  },
  watch: {
    active (val) {
      this.newsList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getNewsList(this.categoryList[val].id)
    }
  }
}
</script>

<style lang='less' scoped>
    /deep/ .van-tabs__wrap {
      width: 85%;
    }
/deep/ .van-sticky--fixed{
  z-index: 999;
}
.more{
  position:absolute;
  right: 0;
  background-color: #ffffff;
  width: 15%;
  height: 44px;
  z-index: 999;
   text-align: center;
  span{
   color: pink;
  }
}
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
