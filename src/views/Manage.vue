<template>
  <div class="manage">
      <new-header>栏目管理</new-header>
    <div class="content">
      <div class="active">
        <h3>点击删除以下频道</h3>
        <div class="list">
          <div class="item" v-for="item in activeList" @click="delTab(item.id)" :key="item.id">{{item.name}} </div>
        </div>
      </div>
      <div class="deactive">
        <h3>点击添加以下频道</h3>
        <div class="list">
            <div class="item" v-for="item in unactiveList" @click="addTab(item.id)" :key="item.id">{{item.name}} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      unactiveList: []
    }
  },
  created () {
    this.getTabsList()
  },
  methods: {
    async getTabsList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      const unactiveList = JSON.parse(localStorage.getItem('unactiveList'))
      if (activeList) {
        this.activeList = activeList
        this.unactiveList = unactiveList
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
      }
    },
    delTab (id) {
      if (this.activeList.length < 5) return
      const index = this.activeList.findIndex(item => item.id === id)
      this.unactiveList.push(this.activeList[index])
      this.activeList.splice(index, 1)
    },
    addTab (id) {
      const index = this.unactiveList.findIndex(item => item.id === id)
      this.activeList.push(this.unactiveList[index])
      this.unactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler (val) {
        localStorage.setItem('activeList', JSON.stringify(val))
        localStorage.setItem('unactiveList', JSON.stringify(this.unactiveList))
      }
    }
  }

}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .active,
  .deactive {
    h3 {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }
    .list {
        overflow: hidden;
      .item {
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #eee;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        float: left;
        margin: 5px;
      }
    }
  }
}

</style>
