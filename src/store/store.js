import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: {},
    // selectedFoods: [],
    cartClickStatus: 0,
    cartClickTarget: {},
    userInfo: null, // 用户信息
    token: '',
    login: false,
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置经度
    geohash: '31.23037,121.473701' // 地址geohash值
  },
  mutations,
  actions
});
export default store;
