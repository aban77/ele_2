import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedFoods: [],
    cartClickStatus: 0,
    cartClickTarget: {}
  },
  getters: {

  },
  mutations: {
    cartClickEvent (state, target) {
      state.cartClickStatus++;
      state.cartClickTarget = target;
      console.log('store.state', state);
    },
    selectedChange(state, foods) {
      state.selectedFoods = foods;
    }
  }
});
export default store;
