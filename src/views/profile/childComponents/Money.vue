<template>
<div class="money">
  <money-item class="item">
      <span slot="left">0.00</span>
      <span slot="center">元</span>
      <div slot="right">我的余额</div>
  </money-item>
  <money-item class="center item">
      <span slot="left">0</span>
      <span slot="center">个</span>
      <div slot="right">我的优惠</div>
  </money-item>
  <money-item class="item">
      <span slot="left">0</span>
      <span slot="center">分</span>
      <div slot="right">我的积分</div>
  </money-item>
</div>
</template>

<script>
import MoneyItem from "./MoneyItem.vue"
export default {
    name:'Money',
    components:{
        MoneyItem
    }
}
</script>

<style scoped>
.money{
    display:flex;
    justify-content: space-between;
    height:80px;
    padding-bottom:15px;
    background-color: #eee;
}
.item{
    flex:1;
    justify-content:space-between;
    text-align: center;
    background-color: #fff;
    
}
.center{
    margin:0 3px;
}
.item span{
    display:inline-block;
    margin-top:6px;

}
</style>