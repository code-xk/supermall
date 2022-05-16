<template>
  <div class="register">
      <div class="image"></div>
      <div class="center">
          <div class="center-top">登录/注册</div>
          <div class="center-bottom">
              <div class="phoneSvg"></div>
              <div>暂无绑定手机号</div>
          </div>
          
      </div>
      <div class="arrow"></div>
  </div>
</template>

<script>
export default {
    name:'Register'
}
</script>

<style scoped>
.register{
    display:flex;
    height:80px;
    background-color:#ff8198;
    color:#fff;
}
.image{
    width:70px;
    background-image:url(../../../assets/img/profile/avatar.svg);
    background-size:65px;
    background-repeat: no-repeat;
    margin:6px 10px;
}
.center{
    flex:1;
}
.center-top{
    margin:16px 0  8px 5px;
}
.center-bottom{
    display:flex;
}
.phoneSvg{
    width:20px;
    height:20px;
    background-image:url(../../../assets/img/profile/phone.svg);
    background-size:20px;
    background-repeat: no-repeat;
}
.arrow{
    margin:25px 6px;
    width:30px;
    background-image:url(../../../assets/img/profile/arrow-right.svg);
    background-size:25px;
    background-repeat: no-repeat;
    color:#fff;
}
</style>