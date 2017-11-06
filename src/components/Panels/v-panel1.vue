<template>
  <div class="vContent-home">
    <router-view class="home-content"></router-view>
  </div>
</template>

<script>
export default{
};
</script>

<style scoped>
  .vContent-home{
    background-color:#50D6D3;
  }
  .home-content{
    position:center;
    margin:0px 50px;
  }
  @media all and (max-width:955px){
    .home-content{
      margin:0px;
    }
  }
</style>