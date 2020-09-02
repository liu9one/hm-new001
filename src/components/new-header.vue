<template>
  <div class="new-header">
      <div class="back" @click='$router.go(-1)'>
          <span class=" iconfont iconjiantou2"></span>
      </div>
      <div class="title">
          <slot></slot>
      </div>
      <div class="extra"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.new-header{
    display: flex;
    height: 50px;
    line-height: 50px;
    width: 100%;
    text-align: center;
     border-bottom: 1px solid #ccc;
     .back,
     .extra{
        width: 50px;
    }
    .title{
       flex: 1;
       font-size: 20px;
    }
}

</style>
