<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input type="text" v-model="key" @keyup.enter='search' @input="recommend" placeholder="请输入搜索关键字">
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 搜索时推荐的列表 -->
    <div class="recommend"  v-if="recommendList.length">
      <div class="item  one-txt-cut " @click="goSearch(item.title
      )" v-for=" item in recommendList" :key="item.id">{{item.title}}
      </div>
    </div>
    <!-- 搜索后显示的 -->
      <div class="list" v-else-if="list.length">
          <hm-post :post='item' v-for="item in list" :key="item.id"></hm-post>
      </div>
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div class="item one-txt-cut" v-for="item in history" @click="goSearch(item)" :key="item">{{item}}</div>
        </div>
      </div>
      <hr>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div class="item">关晓彤</div>
          <div class="item">关晓彤</div>
          <div class="item">关晓彤</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  created () {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  data () {
    return {
      key: '',
      //   搜索到的词条列表
      list: [],
      history: [],
      recommendList: []
    }
  },
  methods: {
    async search () {
      if (this.key.trim() === '') return this.$toast('请输入内容')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
      //   搜索之后 把词条存到本地,
      // 先筛选把不一样词条筛出去
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))

      this.recommendList = []
    },
    goBack () {
      if (this.key) {
        this.key = ''
      } else {
        this.$router.go(-1)
      }
    },
    goSearch (item) {
      this.key = item
      this.search()
    },
    recommend: _.debounce(async function () {
      if (this.key === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
        console.log(this.recommendList)
      }
    }, 1000)
  },
  watch: {
    key (val) {
      if (val === '') {
        this.list = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .center {
    flex: 1;
    padding: 0 10px;
    position: relative;
    input {
      width: 240px;
      height: 34px;
      border-radius: 17px;
      border: 1px solid #ccc;
      font-size: 14px;
      padding-left: 30px;
    }
    .iconfont {
      position: absolute;
      left: 22px;
      top: 18px;
    }
  }
  .right {
    font-size: 14px;
  }
}
.content {
  padding: 10px;
  .history {
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 10px 0;
  }
  .list {
    overflow: hidden;
  }
  .item {
    float: left;
    width: 60px;
    height: 30px;
    border: 1px solid #ccc;
    background-color: #ddd;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
  }
}
.recommend{
   font-size: 16px;
  .item{
    text-indent: 1.5em;
    padding: 10px;
  border-bottom: 1px solid #ccc;
  }
}
.one-txt-cut {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
