<template>
  <div class="hm-comment">
      <div class="header">
          <div class="avatar">
          <img :src="$base + comment.user.head_img" alt="">
      </div>
      <div class="user">
          <p>{{comment.user.nickname}}</p>
          <p>{{comment.create_date | timeNow}}</p>
      </div>
      <div class="right">
          <span>回复</span>
      </div>
      </div>
      <hm-floor class="first" :comment= 'comment.parent' v-if="comment.parent"></hm-floor>
      <div class="content">
          {{comment.content}}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
// .first{
//     border-bottom: 1px solid #cccccc;
// }
.hm-comment{
    margin-top: 30px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    padding: 15px;
.header{
    display: flex;
    align-items: center;
    font-size: 16px;

    .avatar{
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
            object-fit: cover;
        }
    }
    .user{
        flex: 1;
        font-size: 14px;
        line-height: 20px;
        color: #999;
        text-align: left;
    }
}
.right{
    font-size: 14px;
    color: #999;
}
.content{
    margin-top: 20px;
    font-size: 16px;
    text-align: left;
}
}
</style>
