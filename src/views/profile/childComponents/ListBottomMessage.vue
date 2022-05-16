<template>
  <div class="listbottommessage">
      <div class="cart">
          <img src="../../../assets/img/profile/cart.svg" alt="">
          <span>我的购物车</span>
      </div>
      <div class="mall">
          <img src="../../../assets/img/profile/shopping.svg" alt="">
          <span>下载购物APP</span>
      </div>
  </div>
</template>

<script>
export default {
    name:"ListBottomMessage"
}
</script>

<style scoped>
div img{
    display:inline;
    margin:5px 10px 0 10px;
    height:25px;
    line-height:25px;
}
.cart{
    border-bottom:3px solid #eee;
}
div span{
    height:40px;
    line-height:40px;
}
</style>