<template>
  <div id="app">
    <v-header></v-header>
    <v-nav></v-nav>
    <!-- <v-side></v-side> -->
  </div>
</template>

<script>
import vHeader from './components/Sections/v-header';
import vNav from './components/Sections/v-nav';
// import vSide from './components/Sections/v-sideBar';

export default {
  name: 'app',
  components: {
    vHeader,
    vNav
  }
};
</script>

<style scoped>

</style>
