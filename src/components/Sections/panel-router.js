import Vue from 'vue';
import Router from 'vue-router';
import panel1 from '../Panels/v-panel1.vue';
import panel2 from '../Panels/v-panel2.vue';
import panel3 from '../Panels/v-panel3.vue';
import panel4 from '../Panels/v-panel4.vue';
import post from '../Panels/blog_router/post';
import postlist from '../Panels/blog_router/post-list';
import postPage from '../Panels/blog_router/post-page';
import catergoryList from '../Panels/catergory_router/catergory_list';
import showCatergory from '../Panels/catergory_router/catergory';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home/postlist/page-1'
    },
    {
      path: '/home',
      name: 'home',
      component: panel1,
      children: [
        {
          path: 'postlist',
          component: postlist,
          name: 'postList',
          children: [
            {
              path: ':page',
              component: postPage,
              name: 'page'
            }
          ]
        },
        {
          path: ':postDate',
          component: post,
          name: 'post'
        }
      ]
    },
    {
      path: '/timeline',
      name: 'timeLine',
      component: panel2
    },
    {
      path: '/catergories',
      name: 'catergories',
      component: panel3,
      children: [
        {
          path: 'catergories_list',
          name: 'catergoriesList',
          component: catergoryList
        },
        {
          path: ':catergory',
          name: 'catergory',
          component: showCatergory
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: panel4
    }
  ]
});
