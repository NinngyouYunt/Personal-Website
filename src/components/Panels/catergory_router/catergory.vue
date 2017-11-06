<template>
  <div class="v-category-container">
    <router-link to="" class="back"><span v-on:click="goBack()">< Back</span></router-link>
    <div class="header">{{categoryName}}</div>
    <loading-icon v-bind:is-show="loading" background="#f3f3f3" foreground="#B4CE57"  v-bind:class="{'loading-margin': loading}"></loading-icon>
    <error-message v-bind:is-show="hasError" v-bind:message="errorMessage"></error-message>
    <div v-if="!loading&&!hasError" class="loaded-style">
      <div class="subheader">Total Post: {{getTotal}}</div>
      <ul>
          <li v-for="post in postList" v-bind:key="post.postID">
            <router-link v-bind:to="getRouter(post)">{{post.title}}</router-link> at {{post.date}}
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import loadingIcon from '../../reuse/loadingIcon';
import errorMessage from '../../reuse/errorMessage';
const input = [
{ title: 'Test Title 01', date: '2011-01-01', category: 'Testing', postID: '0' },
{ title: 'Test Title 02', date: '2012-02-01', category: 'Thoughts', postID: '1' },
{ title: 'Test Title 03', date: '2013-03-31', category: 'Testing', postID: '2' },
{ title: 'Test Title 04', date: '2014-04-30', category: 'Thoughts', postID: '3' },
{ title: 'Test Title 05', date: '2015-06-05', category: 'Code', postID: '4' },
{ title: 'Test Title 06', date: '2016-06-05', category: 'Thoughts', postID: '5' },
{ title: 'Test Title 07', date: '2017-08-10', category: 'Code', postID: '6' },
{ title: 'Test Title 08', date: '2017-08-12', category: 'Random Stuff', postID: '7' },
{ title: 'Test Title 09', date: '2017-09-12', category: 'Random Stuff', postID: '8' },
{ title: 'Test Title 10', date: '2017-10-09', category: 'Testing', postID: '9' },
{ title: 'Test Title 11', date: '2017-11-12', category: 'Test Cate', postID: '10' },
{ title: 'Test Title 12', date: '2017-12-30', category: 'Random Stuff', postID: '11' }
];
export default {
  components: {
    loadingIcon,
    errorMessage
  },
  data () {
    return {
      postList: input,
      categoryName: '',
      testing: false,
      loading: true,
      hasError: false,
      errorMessage: 'Connection Failed'
    };
  },
  created () {
    this.fetchData(this.testing);
  },
  methods: {
    fetchData: function (testing) {
      this.loading = true;
      this.categoryName = this.$route.params.category;
      if (testing) {
        this.loading = false;
      } else {
        var self = this;
        axios.get('http://www.pxliang.net:8081/category', {
          params: {
            category: self.categoryName
          }
        })
          .then(function (response) {
            self.postList = response.data;
            self.loading = false;
          })
          .catch(function (error) {
            if (error) {
              console.log(error);
              self.loading = false;
              self.hasError = true;
              self.errorMessage = error.toString();
            }
          });
      }
    },
    getRouter: function (post) {
      return '/home/' + post.date + '-' + post.postID;
    },
    goBack: function () {
      window.history.back();
    }
  },
  computed: {
    getTotal: function () {
      return this.postList.length;
    }
  }
};
</script>

<style scoped>

  .loaded-style{
    margin-top:10px;
  }
  .loading-margin{
    margin: 20px 0;
  }
  .v-category-container{
    margin: 20px 35px;
    margin-bottom: 80px;
  }

  ul{
    list-style-type: circle;
    margin-bottom: 30px;
    margin-top: 35px;
    padding-left: 30px;
  }

  li{
    margin-bottom: 16px;
  }

  .cateName{
    font-size:25px;
    padding: 2px 2px 0 2px;
  }

  .header {
    font-size: 35px;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
  }

  .subheader{
    font-size: 18px;
    text-align: center;
  }

  a {
    font-size: 22px;
    color: #1F2626;
    text-decoration: none;
    border-bottom: 2px solid #1F2626;
  }

  a:hover {
    color: #CE57B4;
    border-bottom: 2px solid #CE57B4;
  }
  .back {
    font-size: 30px;
    text-decoration: none;
    color: #1f2626;
    border: none;
  }
  .back:hover {
    text-decoration: underline;
    color: #CE57B4;
    border:none;
  }
</style>
