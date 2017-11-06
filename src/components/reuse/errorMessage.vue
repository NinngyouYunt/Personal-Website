<template>
  <div class="container" v-if="isShow">
    <h3>Something Went Wrong</h3>
    {{message}}
    <br/>
    Please try to refresh the website.
  </div>
</template>

<script>
export default{
  props: [
    'message',
    'isShow'
  ]
};
</script>

<style scoped>
  h3{
    margin: 15px;
  }
  .container{
    margin: 20px;
    text-align: center;
    color: red;
    font-size: 30px;
  }
</style>