import Vue from 'vue';
import Router from 'vue-router';
import { getLocalStorage } from './api/mUtils';
const home = () => import(/* webpackChunkName: "home" */ './page/home/home');
const order = () => import(/* webpackChunkName: "order" */ './page/order/order');
const profile = () => import(/* webpackChunkName: "profile" */ './page/profile/profile');
const profileInfo = () => import(/* webpackChunkName: "info" */ './page/profile/children/info/info');
const address = () => import(/* webpackChunkName: "address" */ './page/profile/children/info/children/address');
const addAddress = () => import(/* webpackChunkName: "addAddress" */ './page/profile/children/info/children/children/addAddress');

const login = () => import(/* webpackChunkName: "login" */ './page/login/login');
const shop = () => import(/* webpackChunkName: "shop" */ './page/shop/shop');
const goods = () => import(/* webpackChunkName: "goods" */ './components/goods/goods');
const confirmOrder = () => import(/* webpackChunkName: "confirmOrder" */ './page/confirmOrder/confirmOrder');
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
      path: '/home',
      name: 'home',
      component: home
    },
    // {
    //   path: '/shop/',
    //   name: 'shop',
    //   component: shop
    // },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      children: [
        {
          path: 'info', // 个人信息详情页
          component: profileInfo,
          children: [
            {
              path: 'address',
              component: address,
              children: [{
                path: 'addAddress',
                component: addAddress
              }]
            }
          ]

        }]

    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      redirect: '/shop/goods',
      children: [
        {
          path: 'goods',
          component: goods

        }]
    }, {
      path: '/confirmOrder',
      component: confirmOrder
    }
  ]
});
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

// 导航守卫;
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = getLocalStorage('Authorization');
    if (token) {
      router.app.$options.store.dispatch('getUserInfo', token);
    }
    next();
  }
});

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
