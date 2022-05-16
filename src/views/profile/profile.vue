<template>
<div>
   <nav-bar class="navbar"><div slot="center">我的档案</div></nav-bar>
   <register></register>
   <money></money>
   <list-message></list-message>
   <list-bottom-message></list-bottom-message>
</div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue"
import Register from "./childComponents/Register.vue"
import Money from"./childComponents/Money.vue"
import ListMessage from "./childComponents/ListMessage.vue"
import ListBottomMessage from"./childComponents/ListBottomMessage.vue"


export default {
    name:'Profile',
    components:{
      NavBar,
      Register,
      Money,
      ListMessage,
      ListBottomMessage
    }
}
</script>

<style scoped>
.navbar{
  background-color:#ff8198;
  color:#fff;
}
</style>