<template>
    <div class="vHeader jumbotron">
      <h1>{{title}}</h1>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Peter\'s Personal Page'
    };
  }
};
</script>

<style scoped>
  h1{
    text-align: center;
    color:#FFFFFF;
  }
  .vHeader{
    border:5px solid #434C4C;
    background-color:#434C4C;
    margin: 30px 0px;
  }
</style>
