<template>
  <div class="hm-post">
    <div class="single-img-item" >
              <div class="info">
                  <div class="title">
                      {{post.title}}
                  </div>
                  <div class="user">
                      <span >{{post.user.nickname}}</span>
                      <span > &nbsp; {{post.comment_length}}人跟帖</span>
                  </div>
              </div>
              <div class="img">
                  <img :src="$url(post.cover[0].url)" alt="">
              </div>
          </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang='less' scoped>
.single-img-item{
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
