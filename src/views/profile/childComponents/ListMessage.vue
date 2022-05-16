<template>
  <div class="listmessage">
      <div class="message">
          <img src="../../../assets/img/profile/message.svg" alt="">
          <span>我的消息</span>
      </div>
      <div class="mall">
          <img src="../../../assets/img/profile/pointer.svg" alt="">
          <span>积分商城</span>
      </div>
      <div class="vip">
          <img src="../../../assets/img/profile/vip.svg" alt="">
          <span>会员卡</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'ListMessage'
}
</script>

<style scoped>
.listmessage{
    background-color: #eee;
    padding-bottom:10px;
}
.listmessage div{
    background-color: #fff;
    margin-bottom:2px;
    position:relative;
}
div img{
    display:inline;
    margin:5px 10px 0 10px;
    height:25px;
    line-height:25px;
}
div span{
    height:40px;
    line-height:40px;
}
</style>