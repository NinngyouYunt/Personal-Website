// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import normalize from 'normalize.css';
import App from './App';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.use(normalize);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
});

// axios.get('http://www.pxliang.net:8081/', {
//   params: {
//     col: '*'
//   }
// })
//   .then(function (response) {
//     console.log('Printing result');
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// console.log('Requset Sent');
