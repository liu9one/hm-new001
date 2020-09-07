<template>
  <div>
      <hm-floor :count='count-1'  :comment='comment.parent' v-if="comment.parent"></hm-floor>
      <div class="hm-floor">
      <div class="title">
        <div class="left">{{count}}. {{comment.user.nickname}}</div>
        <div class="time
        ">{{comment.create_date | timeNow}}</div>
        <!-- <div class="right" @click="reply">回复</div> -->
        <div class="right" @click="reply">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    count: Number
  },
  methods: {
    // 孙子辈组件传给第一级组件,先把数据传给父级,再由父级像上传
    reply () {
      console.log(this.comment.id, this.comment.user.nickname)
      this.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
  }
}
</script>

<style lang='less' scoped>
.hm-floor{
    margin-top: -1;
    border: 1px solid #ccc;
    // border-bottom:none ;
    padding: 10px;
      font-size: 14px;
      border-radius: 7px;
    .title{

    display: flex;
    }
    .time{
        flex: 1;
        text-align: left;
        font-size: 12px;
        color: #666;
        padding-left: 10px;
    }
    .right{
        color: #666;
        font-size: 12px;
        text-align: right;
    }
    .content {
        text-align: left;
        font-size: 16px;
        margin-top: 20px;
    }
}
</style>
