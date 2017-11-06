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
        <router-link to="/catergories/catergories_list" class="tab3-color" data-toggle="tab" v-bind:class="{'active':isActive[2]}">Catergory</router-link>
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
    $route: function () {
      this.changeActive();
    }
  },
  methods: {
    changeActive: function () {
      if (this.$route.name === 'page' || this.$route.name === 'post') {
        this.setActive(0);
      } else if (this.$route.name === 'timeLine') {
        this.setActive(1);
      } else if (this.$route.name === 'catergoriesList') {
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

  .rv-container{
    color: #1F2626;
    margin: 0 120px 60px 200px;
    text-align: left;
    float: none;
  }

  .navContent{
    padding: 30px 35px 30px 35px;
    border-radius: 5px 5px 5px 5px;
  }

  .navbar{
    z-index: 10;
    margin:0 140px 0 0;
  }

  .tabs{
    display: inline;
  }

  a{
    padding: 14px 28px;
    border-radius: 5px 5px 0 0;
    font-size: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    /*Needs more change*/
    user-select: none;
    cursor: pointer;
    color: #1F2626;
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
  @media all and (max-width:955px){
    .rv-container{
      margin: 0px 60px 60px 100px;
    }
    .navbar{
      margin-right: 80px;
    }
  }
  @media all and (max-width:955px){
    .rv-container{
      margin: 0px 60px 60px 60px;
    }
    .navbar{
      margin: 0px;
      position: fixed;
      top: 20%;
      width: 120px;
      text-align: right;
      right:-90px;
      padding: 5px 0px 7px 0px;

      -webkit-transition: right .1s linear;
      -moz-transition: right .1s linear;
      -o-transition: right .1s linear;
      transition: right .1s linear;
    }
    
    .navbar:hover{
      right:-5px;
    }

    a {
      border-radius: 5px 0 0 5px;
      margin: 3px 0 3px 0;
      padding: 7px 1px 7px 15px;
      width: 90px;
      border: 1px solid white;       
      font-size: 16px;
      font-weight:bold;
      text-align: center; 

      -webkit-transition: width .1s ease-in-out;
      -moz-transition: width .1s ease-in-out;
      -o-transition: width .1s ease-in-out;
      transition: width .1s ease-in-out;
    }
    a:hover{
      width:100px;
    }
    .active{
      width:100px;;
    }
  }
</style>
