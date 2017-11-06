<template>
  <div style="text-align:center">
    <div  class="loading" v-if="isShow" v-bind:style="styleObject"></div>
  </div>
</template>

<script>
export default {
  props: ['isShow', 'background', 'foreground'],
  data () {
    return {
      styleObject: {
        border: '9px solid ' + this.background,
        borderTop: '9px solid' + this.foreground
      }
    };
  }
};
</script>

<style scoped>
.loading {
  text-align: center;
  display: inline-block;
  border: 9px solid #f3f3f3;
  border-radius: 50%;
  border-top: 9px solid #3498db;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>