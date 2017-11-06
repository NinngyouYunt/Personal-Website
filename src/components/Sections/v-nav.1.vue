<template>
  <div>
    <div class="navbar" align="right">
      <div class="tabs">
        <router-link to="/" class="tab1-color" data-toggle="tab" v-bind:class="{'active':isActive[0]}">Home</router-link>
      </div>
      <div class="tabs">
        <router-link to="/timeline" class="tab2-color" data-toggle="tab" v-bind:class="{'active':isActive[1]}">Time Line</router-link>
      </div>
      <div class="tabs">
        <router-link to="/catergories" class="tab3-color" data-toggle="tab" v-bind:class="{'active':isActive[2]}">Catergory</router-link>
      </div>
      <div class="tabs">
        <router-link to="/about" class="tab4-color" data-toggle="tab" v-bind:class="{'active':isActive[3]}">About</router-link>
      </div>
    </div>
    <div class="rv-container">
      <router-view  class="navContent"></router-view>
    </div>
  </div>
</template>

<script>
import router from './panel-router';

export default {
  data () {
    return {
      isActive: [true, false, false, false]
    };
  },
  router,
  created () {
    this.changeActive();
  },
  watch: {
    : 'changeActive'
  },
  methods: {
    changeActive: function () {
      if (this.$route.name === 'postList') {
        this.setActive(0);
      } else if (this.$route.name === 'timeLine') {
        this.setActive(1);
      } else if (this.$route.name === 'catergory') {
        this.setActive(2);
      } else if (this.$route.name === 'about') {
        this.setActive(3);
      }
      // timeLine catergory about
    },
    setActive: function (index) {
      for (let i = 0; i < this.isActive.length; i++) {
        this.isActive[i] = false;
      }
      this.isActive[index] = true;
    }
  }
};
</script>

<style scoped>
  .active{
    width:80px;
  }
  
  .rv-container{
    color: #1F2626;
    margin: 0px 40px 60px 40px;
    text-align: left;
    float: none;
  }

  .navContent{
    padding: 30px 35px 30px 35px;
    border-radius: 5px 5px 5px 5px;
  }

  .navbar{
    position: fixed;
    top:20%;
    right:-75px;

    -webkit-transition: right .1s linear;
    -moz-transition: right .1s linear;
    -o-transition: right .1s linear;
    transition: right .1s linear;
  }

  .navbar:hover{
    right:0px;
  }
  .navbar:hover a{
    border: .5px solid #FFFFFF;
  }

  a{
    border-radius: 5px 0 0 5px;
    margin: 0 0 5px 0;
    padding: 5px 1px 5px 18px;
    width: 70px;
    border: 1px solid transparent;

    text-align: center;
    text-decoration: none;
    display: inline-block;
    /*Needs more change*/
    user-select: none;
    cursor: pointer;
    color: #1F2626;

    -webkit-transition: width .1s linear;
    -moz-transition: width .1s linear;
    -o-transition: width .1s linear;
    transition: width .1s linear;
  }

  a:hover{
    width:80px;
    right: 80px;
  }

  
  .tab1-color{
    background-color:#50D6D3;
  }
  .tab2-color{
    background-color:#52E2A4;
  }
  .tab3-color{
    background-color:#B4CE57;
  }
  .tab4-color{
    background-color:#DDC354;
  }

  a:hover{
    background-color:grey;
  }
  @media all and (min-width:955px){
    .rv-container{
      margin: 0 120px 60px 350px;
    }
  }
  @media all and (min-width:640px){
    .navbar{
      position: relative;
      top:auto;
      right:auto;
      margin:0 140px 0 0;
    }
    .navbar:hover a{
      border: none;
    }  
    .tabs{
      display:inline;
    }
    a {
      padding: 10px 20px;
      border-radius: 5px 5px 0 0;
      margin: 0;
      width: auto;
      border: none;
    }
    a:hover{
      width:auto;
    }
    .active{
      width:auto;
    }
  }
</style>
