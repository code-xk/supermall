<template>
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'recommendView',
    props:{
        recommends:{
            type:Array,
            dafault() {
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    display:flex;
    width:100%;
    font-size:12px;
    padding:15px 0 30px;
    text-align:center;
    border-bottom:8px solid #eee;
}
.recommend-item{
    flex:1;
}
.recommend-item img{
    width:70px;
    height:70px;
    margin-bottom:10px;
}
</style>