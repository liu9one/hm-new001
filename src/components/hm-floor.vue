<template>
  <div>
      <hm-floor :comment='comment.parent' v-if="comment.parent"></hm-floor>
      <div class="hm-floor">
      <div class="title">
        <div class="left">1. {{comment.user.nickname}}</div>
        <div class="time
        ">{{comment.create_date | timeNow}}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object
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
