<template>
  <div class="hm-post" @click="$router.push(`/PostDetail/${post.id}`)">
    <div class="video-item" v-if="post.type===2">
        <div class="title">
            {{post.title}}
        </div>
        <div class="img">
            <img :src="$url(post.cover[0].url)" alt="">
            <span class="iconfont iconshipin"></span>
        </div>
        <div class="user">
                      <span >{{post.user.nickname}}</span>
                      <span > &nbsp; {{post.comment_length}}人跟帖</span>
                  </div>
    </div>
    <div class="single-img-item"  v-else-if="post.cover.length > 0 && post.cover.length < 3 ">
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
          <div class="multiple-img-post" v-else-if="post.cover.length>2">
              <div class="info">
                  <div class="title">
                      {{post.title}}
                  </div>
                  <div class="imgs">
                  <img :src="$url(post.cover[0].url)" alt="">
                  <img :src="$url(post.cover[1].url)" alt="">
                  <img :src="$url(post.cover[2].url)" alt="">
              </div>
                  </div>
                  <div class="user">
                      <span >{{post.user.nickname}}</span>
                      <span > &nbsp; {{post.comment_length}}人跟帖</span>
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
        position: relative;
        img{
            width: 120px;
            height: 74px;
            object-fit: cover;
        }
        span{
            position: absolute;
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, .5);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      font-size: 24px;

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
.multiple-img-post {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .title {
    font-size: 16px;
  }
  .imgs {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
  .user{
      font-size: 14px;
      color: #ccc;
  }
}
.video-item{
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 16px;
    .img{
        position: relative;
        img{
            width: 100%;
            height: 170px;
            object-fit: cover;
        }
        span{
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, .5);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      font-size: 32px;
        }
    }
    .user{
        font-size: 14px;
        color: #ccc;
    }
}
</style>
