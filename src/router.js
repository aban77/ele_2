import Vue from 'vue';
import Router from 'vue-router';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/goods'
    },
    {
      path: '/goods/',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});
