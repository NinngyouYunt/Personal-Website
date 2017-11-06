<template>
  <div class="container">
    <router-link to="" class="back"><span v-on:click="goBack()">< Back</span></router-link>
    <loading-icon v-bind:is-show="loading" background="#f3f3f3" foreground="#50D6D3" v-bind:class="{'loading-margin': loading}"></loading-icon>
    <error-message v-bind:is-show="hasError" v-bind:message="errorMessage">{{post.date}}</error-message>
    <div class="content-style" v-if="!loading&&!hasError" v-html="content">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import loadingIcon from '../../reuse/loadingIcon';
import errorMessage from '../../reuse/errorMessage';

const input = {
  date: '0000-00-00',
  title: 'Title',
  catergory: 'Catergory',
  address: 'Address'
};

export default {
  components: {
    loadingIcon,
    errorMessage
  },
  data () {
    return {
      post: {
        date: '0000-00-00',
        title: 'Title',
        catergory: 'Catergory',
        address: 'Address'
      },
      content: null,
      loading: true,
      hasError: false,
      errorMessage: 'Connection Failed',
      testing: false
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
    fetchData (testing) {
      this.loading = true;
      if (testing) {
        this.post = input;
        this.loading = false;
        this.content = 'Content';
      } else {
        this.hasError = false;
        var self = this;
        axios.get('http://www.pxliang.net:8081/getPost', {
          params: {
            postDate: self.$route.params.postDate
          }
        })
          .then(function (response) {
            self.content = response.data;
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
    goBack: function () {
      window.history.back();
    }
  },
  computed: {
    getDate: function () {
      return this.$route.params.postDate.substring(0, 10);
    },
    getPostID: function () {
      return this.$route.params.postDate.substring(11);
    }
  }
};
</script>

<style scoped>
  .back {
    font-size: 30px;
    text-decoration: none;
    color: #1f2626;
  }
  .back:hover {
    text-decoration: underline;
    color: #D67150;
  }
  .container{
    margin-top:30px;
    margin-bottom: 80px;
  }
  .loading-margin{
    margin: 160px 0;
  }
  .arrow-icon{
    width:40px;
  }
  a{
    text-decoration: none;
    color: #1F2626;
  }
  a:hover{
    color: #D67150;
    text-decoration: underline;
  }
  .content-style{
    margin: 20px 0;
    text-align: center;
  }
</style>
