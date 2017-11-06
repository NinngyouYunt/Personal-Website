<template>
  <div class="vContent-timeline">
    <time-line></time-line>
  </div>
</template>

<script>
import timeLine from './timeLine_router/timeLine';

export default {
  components: {
    timeLine
  },
  data () {
    return {
    };
  }
};
</script>

<style scoped>

/* Original Line */
.vContent-timeline {
  background-color: #52E2A4;
  font-size: 20px;
  overflow: overlay;
  text-align: center;
  padding: 40px 0;
  min-height: 400px;
}

a {
  text-decoration: none;
  color: #1F2626;
  font-size: 50px;
}

a:hover {
  color: #E26852;
  text-decoration: underline;
}

</style>