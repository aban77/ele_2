import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './common/stylus/index.styl';
import store from './store/store';
import VueLoadmore from 'vuejs-loadmore';
Vue.use(VueLoadmore, {
  lang: 'en-US'
});
Vue.config.productionTip = false;
console.log('app', App);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

/* eslint-disable no-new */
// new Vue({
//   el: '#body',
//   router,
//   components: { 'app': App }
// })
