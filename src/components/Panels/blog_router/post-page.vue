<template>
  <div class="container">
    <loading-icon v-bind:is-show="loading" background="#f3f3f3" foreground="#50D6D3"  v-bind:class="{'loading-margin': loading}"></loading-icon>
    <error-message v-bind:is-show="hasError" v-bind:message="errorMessage"></error-message>
    <div v-if="!loading&&!hasError">
      <div v-for="post in posts" v-bind:key="post.postID" class="section" >
        <div class="title"><router-link v-bind:to="getRouter(post)">{{post.title}}</router-link></div>
        <div class="subtitle">{{post.date}} | {{post.category}}</div>
        <article class="abstract">
          {{post.abstract}}
          <router-link v-bind:to="getRouter(post)" class="more">Read More...</router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import loadingIcon from '../../reuse/loadingIcon';
import errorMessage from '../../reuse/errorMessage';
const input = [
{ title: 'Test Title 01', date: '2011-01-01', category: 'Testing', abstract: 'AB1', postID: '1' },
{ title: 'Test Title 02', date: '2012-02-01', category: 'Thoughts', abstract: 'AB2', postID: '2' },
{ title: 'Test Title 03', date: '2013-03-31', category: 'Testing', abstract: 'AB3', postID: '3' },
{ title: 'Test Title 04', date: '2014-04-30', category: 'Thoughts', abstract: 'AB4', postID: '4' },
{ title: 'Test Title 05', date: '2015-06-05', category: 'Code', abstract: 'AB5', postID: '5' },
{ title: 'Test Title 06', date: '2016-06-05', category: 'Thoughts', abstract: 'AB6', postID: '6' },
{ title: 'Test Title 07', date: '2017-08-10', category: 'Code', abstract: 'AB7', postID: '7' },
{ title: 'Test Title 08', date: '2017-08-12', category: 'Random Stuff', abstract: 'AB8', postID: '8' },
{ title: 'Test Title 09', date: '2017-09-12', category: 'Random Stuff', abstract: 'AB9', postID: '9' },
{ title: 'Test Title 10', date: '2017-10-09', category: 'Testing', abstract: 'AB10', postID: '10' },
{ title: 'Test Title 11', date: '2017-11-12', category: 'Test Cate', abstract: 'AB11', postID: '11' },
{ title: 'Test Title 12', date: '2017-12-30', category: 'Random Stuff', abstract: 'AB12', postID: '12' }
].reverse();
// [{"title":0,"content":"This is content"},{"title":1,"content":"This is content"}]
export default {
  components: {
    loadingIcon,
    errorMessage
  },
  data () {
    return {
      posts: input,
      postPerPage: 5,
      page: 1,
      testing: false,
      loading: true,
      hasError: false,
      errorMessage: 'Connection Failed'
    };
  },
  created () {
    this.fetchData(this.testing);
  },
  watch: {
    $route: function () {
      this.fetchData(this.testing);
    }
  },
  methods: {
    fetchData: function (testing) {
      this.page = parseInt(this.$route.params.page.substring(5));
      this.loading = true;
      if (testing) {
        this.posts = input;
        this.posts = input.slice((this.page - 1) * this.postPerPage, this.page * this.postPerPage);
        this.loading = false;
      } else {
        var self = this;
        axios.get('http://www.pxliang.net:8081/postList', {
          params: {
            page: self.page
          }
        })
          .then(function (response) {
            self.posts = response.data;
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
    getRouter: function (post) {
      return '/home/' + post.date + '-' + post.postID;
    }
  },
  computed: {
    total: function () {
      return 1;
    }
  }
};
</script>

<style scoped>
  .more{
    text-decoration: underline;
  }
  .loading-margin{
    margin: 160px 0;
  }
  .container{
    margin-top: 30px;
  }
  .title{
    margin-bottom: 0px 0px 0px 0px;
    font-size:30px;
    font-weight: bold;
  }
  .subtitle{
    margin-top:8px;
    font-weight:bold;
  }
  .abstract{
    font-size: 20px;
    margin-top: 10px;
    word-wrap: break-word;
    line-height: 150%;
  }
  .section{
    width: inherit;
    border-bottom: 2px dashed rgba(31,38,38,0.3);
    margin: 0px 0px 75px 0px;
    padding: 0px 0px 40px 0px; 
  }
  a{
    text-decoration: none;
    color: #1F2626;
  }
  a:hover{
    color: #D67150;
    text-decoration: underline;
  }
  @media all and (max-width:955px){
    .container{
      margin-top:10px;
    }
  }
</style>
