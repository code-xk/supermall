<template>
  <div class="moneyitem">
      <span class="num"><slot name="left"></slot></span>
      <slot name="center"></slot>
      <slot name="right"></slot>
  </div>
</template>

<script>
export default {
    name:'MoneyItem'
}
</script>

<style scoped>
.num{
    font-size:23px;
    color:#ff5000;
    font-weight:bold;
}
</style>