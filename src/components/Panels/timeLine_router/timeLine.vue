<template>
  <div class="container">
    <div class="system">
      <div class="crane-wrapper"  v-if="!hasError">
        <img src="../../../resources/svg/timeline-crane.svg">
      </div>
      <div class="timeline">
        <ul>
          <li v-for=" post in posts" v-bind:key="post.postID">
            <div>
              {{post.date}}<br/>
              <router-link v-bind:to="getRouter(post)">{{post.title}}</router-link><br/>
              {{post.category}}
            </div>
          </li>
        </ul>
      </div>  
    </div>
    <error-message v-bind:is-show="hasError" v-bind:message="errorMessage" style="margin-bottom:100px"></error-message>
    <loading-icon v-bind:is-show="!showAll&&!loading&&!hasError" background="#f3f3f3" foreground="#52E2A4"></loading-icon>
    <div class="ending" v-if="showAll&&!hasError">
      This is where the journey started.
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
{ title: 'Test Title 12222222222222222222222222222222', date: '2017-12-30', category: 'Random Stuff', postID: '11' }
].reverse();
export default {
  components: {
    loadingIcon,
    errorMessage
  },
  data () {
    return {
      posts: [],
      page: 1,
      postPerPage: 5,
      testing: false,
      showAll: false,
      loading: false,
      hasError: false,
      errorMessage: 'Connection Failed'
    };
  },
  methods: {
    handleScroll: function (e) {
      if ((window.innerHeight + window.scrollY) >= e.srcElement.body.scrollHeight && !this.loading) {
        this.page++;
        this.fetchData(this.testing);
      }
      if (this.showAll) {
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
    fetchData (testing) {
      if (testing) {
        this.posts = this.posts.concat(input.slice((this.page - 1) * this.postPerPage, this.page * this.postPerPage));
        this.loading = false;
        if (this.postPerPage * this.page >= input.length) this.showAll = true;
      } else {
        var self = this;
        if (!this.showAll) {
          this.loading = true;
          axios.get('http://www.pxliang.net:8081/postList', {
            params: {
              page: self.page
            }
          })
            .then(function (response) {
              self.loading = false;
              if (response.data.length !== 0) {
                self.posts = self.posts.concat(response.data);
              } else {
                self.showAll = true;
              }
              if (response.data.length < 5) {
                self.showAll = true;
              }
            })
            .catch(function (error) {
              if (error) {
                console.log(error);
                self.hasError = true;
                self.errorMessage = error.toString();
                self.loading = false;
                self.showAll = true;
              }
            });
        }
      }
    },
    getRouter: function (post) {
      return '/home/' + post.date + '-' + post.postID;
    }
  },
  created: function () {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchData(this.testing);
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
  a{
    text-decoration: underline;
    color: white;
  }
  a:hover{
    color: grey;
    text-decoration: underline;
  }
  .ending{
    font-size:30px;
    font-family: 'Lucida Calligraphy','Axure Handwriting', "Comic Sans MS", cursive, sans-serif;
    margin:10px 0;
    /*   */
  }
  .system{
    position: relative;
    left:-5px;
    margin-bottom: 100px;
  }
  @media all and (max-width:1444px){
    .system{
      float:right;
      left:-20px;
    }
  }  

  .crane-wrapper{
    position: relative;
    width: 1100px;
    height:0px;
  }
  .timeline{
    position: relative;
    width:0px;
    left:1021px;
    top: 60px;
  }

  .timeline ul li{
    list-style-type: none;
    position: relative;
    width: 6px;
    margin: 0 auto;
    padding-top: 80px;
    background: #1F2626;
  }
  .timeline ul li:after{
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: inherit;
  }

  .timeline ul li div{
    position: relative;
    bottom: 0;
    background: #1f2626;
    color:white;
    border-radius: 10px;
    padding: 20px 10px;
    width: 250px;
    word-wrap: break-word;
  }
  /* 250+300-6 */
  .timeline ul li:nth-child(odd) div{
    right: 300px;
  }
  /* Arrow */
  .timeline ul li div::before{
    content: '';
    position: absolute;
    bottom: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 20px;
    border-color: #1f2626;
  }
  .timeline ul li:nth-child(odd) div::before{
    right: -35px;
  }
  @media all and (min-width:1750px){
    .timeline ul li:nth-child(even) div{
      left: 35px;
    }
    .timeline ul li:nth-child(even) div::before{
      left: -35px;
    }
  }

  @media all and (max-width:1750px){    
    .timeline ul li:nth-child(even) div{
      right: 300px;
    } 
    .timeline ul li:nth-child(even) div::before{
      right: -35px;
    }
  } 
  /*Left right*/
</style>
