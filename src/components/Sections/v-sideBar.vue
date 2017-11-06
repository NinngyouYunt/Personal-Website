<template>
  <div>
    <transition-group name="slide-fade">
      <div class="sideBar" v-if="isShow" key="canvas">
        
      </div>
      <a class="toggleButton closeButton" v-on:click="changeShow" v-if="isShow" key="trigger"></a>
    </transition-group>

    <a class="toggleButton openButton" v-on:click="changeShow"></a>
  </div>
</template>

<script>

export default {
  props: {
  },
  data () {
    return {
      isShow: false
    };
  },
  methods: {
    changeShow: function () {
      this.isShow = !this.isShow;
    }
  },
  computed: {
    triggerAnimation: function () {
      return {
    //    'slide-fade-enter-active': this.isShow,
        'panel-leave': !this.isShow,
    //    'slide-fade-leave-active': !this.isShow,
        'panel-enter': this.isShow
      };
    }
  }
};
</script>

<style scoped>
  /*.sideBar{
    overflow: scroll;
  }*/

  .sideBar{
    border-radius: 0px 10px 10px 0px;
    position: fixed;
    left: 0;
    top: 20%;
    width:200px;
    height:70%;
    background-color:#62bcba;
    z-index:1 ;
  }

  .toggleButton{
    padding: 5px; 
    background-color: #62bcba;
    color: #1F2626;
    height: 100px;
    width: 25px;
    border-radius: 0px 10px 10px 0px;
    cursor: pointer;
    align-content:center;
    user-select: none;
    position:fixed;
    top:35%;
  }

  .openButton{
    left:0;
    z-index: 0;
  }

  .closeButton{
    left:200px;
    z-index:1 ;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(-200px);
  }
</style>
