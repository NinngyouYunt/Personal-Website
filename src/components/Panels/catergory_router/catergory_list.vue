<template>
  <div class="container">
    <div v-if="!loading&&!hasError">
      <div class="header">Catergory</div>
      <div class="cat-system">
        <div class="subheader">Total Catergory: {{catergories.length}}</div>
        <ul>
          <li v-for="catergory in catergories" v-bind:key="catergory.postID">
            <router-link v-bind:to="getRouter(catergory.name)" class="cateName">{{catergory.name}}</router-link>
            <span class="boring">({{catergory.number}})</span>
          </li>
        </ul>
      </div>
    </div>
    <loading-icon v-bind:is-show="loading" background="#f3f3f3" foreground="#B4CE57" v-bind:class="{'loading-margin': loading}"></loading-icon>
    <error-message v-bind:is-show="hasError" v-bind:message="errorMessage"></error-message>
    <div v-if="!hideTag">
      <div class="header" >Tags</div>
      <div class="tagSection">
        <div v-for="tag in tags" v-bind:key="tag" class="tags">
          <a href="/" v-on:click.prevent="click">{{tag}}</a>
          <span>&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import loadingIcon from '../../reuse/loadingIcon';
import errorMessage from '../../reuse/errorMessage';
// route
const cateInput = [
{ name: 'Testing', number: 3 },
{ name: 'Thoughts', number: 3 },
{ name: 'Code', number: 2 },
{ name: 'Random Stuff', number: 2 },
{ name: 'Test Cate', number: 1 }
];
const tagInput = [
  'CSS', 'Html', 'Java',
  'Python', 'JavaScript', 'tag1',
  'tag2', 'tag3', 'tag4',
  'tag5', 'tag6', 'tag7',
  'tag2', 'tag3', 'tag4',
  'tag5', 'tag6', 'tag7'
];
export default {
  components: {
    loadingIcon,
    errorMessage
  },
  data () {
    return {
      catergories: cateInput,
      tags: tagInput,
      testing: false,
      loading: true,
      hasError: false,
      errorMessage: 'Connection Failed',
      hideTag: true
    };
  },
  created () {
    this.fetchData(this.testing);
  },
  methods: {
    click: function () {
      console.log(this.$route.fullPath);
    },
    fetchData: function (testing) {
      this.loading = true;
      if (testing) {
        this.loading = false;
      } else {
        var self = this;
        axios.get('http://www.pxliang.net:8081/catergoryList', {
          params: {
          }
        })
          .then(function (response) {
            self.catergories = response.data;
            self.loading = false;
          })
          .catch(function (error) {
            if (error) {
              console.log(error);
              self.hasError = true;
              self.errorMessage = error.toString();
              self.loading = false;
            }
          });
      }
    },
    getRouter: function (catergoryName) {
      return '/catergories/' + catergoryName;
    }
  }
};
</script>

<style scoped>
  .container{
    margin-top:20px;
    margin-bottom: 10px;
  }
  .cat-system{
    margin-top: 5px;
  }
  .loading-margin{
    margin: 100px 0;
  }
  ul{
    list-style-type: circle;
    margin-bottom: 20px;
    margin-top: 5px;
    margin-left: 45px;
  }
  li{
    margin-bottom: 10px;
  }
  .tagSection{
    padding: 10px 90px;
  }

  .cateName{
    font-size:25px;
    padding: 2px 2px 0 2px;
  }

  .boring{
    opacity: 0.75;
    font-size:15px;
  }

  .tags{
    display: inline-block;
    padding: 2px 3px;
  }

  .header {
    font-size: 35px;
    text-align: center;
    font-weight: bold;
  }

  .subheader{
    font-size: 18px;
    text-align: center;
  }

  a {
    font-size: 25px;
    color: #1F2626;
    text-decoration: none;
    border-bottom: 2px solid #1F2626;
  }

  a:hover {
    color: #CE57B4;
    border-bottom: 2px solid #CE57B4;
  }
</style>