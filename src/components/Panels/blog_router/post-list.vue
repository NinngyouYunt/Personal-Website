<template>
  <div class="container">
    <router-view></router-view>
    <div class="pageBar" v-if="!hasError&&!loading">
      <router-link v-bind:to="arrowRouter"><span v-on:click="setCurrent(currentPage-1)"><</span></router-link>
      <span v-for="pageNum in pages" v-bind:key="pageNum">
        <router-link v-bind:to="getRouter(pageNum)"  v-bind:class="{'selected':pageNum===currentPage}">&nbsp;<span v-on:click="setCurrent(pageNum)">{{pageNum}}</span>&nbsp;</router-link>
      </span>
      <router-link v-bind:to="arrowRouter"><span v-on:click="setCurrent(currentPage+1)">></span></router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      currentPage: 1,
      postPerPage: 5,
      maxPage: 1,
      pages: [],
      postNumber: 1,
      testing: false,
      hasError: false,
      loading: false
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
      var self = this;
      this.loading = true;
      // REQUIRED max page reached no more loading
      if (testing) {
        self.postNumber = 12;
        self.maxPage = parseInt(self.postNumber / self.postPerPage);
        if (self.postNumber % self.postPerPage > 0) {
          self.maxPage++;
        }
        for (let i = 0; i < self.maxPage; i++) {
          self.pages[i] = i + 1;
        }
        this.$route.params.hello = this.postNumber;
      } else {
        axios.get('http://www.pxliang.net:8081/post-count', {
          params: {
          }
        })
          .then(function (response) {
            self.postNumber = response.data[0]['COUNT(*)'];
            self.maxPage = parseInt(self.postNumber / self.postPerPage);
            if (self.postNumber % self.postPerPage > 0) {
              self.maxPage++;
            }
            for (let i = 0; i < self.maxPage; i++) {
              self.pages[i] = i + 1;
            }
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
    getRouter: function (page) {
      return '/home/postlist/page-' + page;
    },
    setCurrent: function (page) {
      if (page >= 1 && page <= this.maxPage) {
        this.currentPage = page;
      }
    }
  },
  computed: {
    arrowRouter: function () {
      return '/home/postlist/page-' + (this.currentPage);
    }
  }
};
</script>

<style scoped>

  .pageBar{
    font-size: 20px;
    font-weight: bold;
    width: 200px;
    padding: 5px;
    margin: 0 auto;
    text-align: center;
  }
  a{
    text-decoration: none;
        /*Needs more change*/
    user-select: none;
    cursor: pointer;
    color: #1F2626;
  }
  a:hover{
    color: #D67150;
    text-decoration: underline;
  }  
  .selected{
    font-weight: none;
    color: white;
  }
</style>
