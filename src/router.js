import Vue from 'vue';
import Router from 'vue-router';
const home = () => import(/* webpackChunkName: "home" */ './page/home/home');
const order = () => import(/* webpackChunkName: "order" */ './page/order/order');
const profile = () => import(/* webpackChunkName: "profile" */ './page/profile/profile');
const login = () => import(/* webpackChunkName: "login" */ './page/login/login');
// const shop = () => import(/* webpackChunkName: "home" */ './page/shop/shop');
// import goods from './components/goods/goods.vue';
// import ratings from './components/ratings/ratings';
// import seller from './components/seller/seller';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home/',
      name: 'home',
      component: home
    },
    // {
    //   path: '/shop/',
    //   name: 'shop',
    //   component: shop
    // },
    {
      path: '/order/',
      name: 'order',
      component: order
    },
    {
      path: '/profile/',
      name: 'profile',
      component: profile
    },
    {
      path: '/login/',
      name: 'login',
      component: login
    }
  ]
});
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

export default router;
// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   linkExactActiveClass: 'active',
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       redirect: '/goods'
//     },
//     {
//       path: '/goods/',
//       name: 'goods',
//       component: goods
//     },
//     {
//       path: '/ratings',
//       name: 'ratings',
//       component: ratings
//     },
//     {
//       path: '/seller',
//       name: 'seller',
//       component: seller
//     }
//   ]
// });
