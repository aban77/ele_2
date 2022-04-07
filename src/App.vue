<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
    <div class="shopcart-wrapper">
      <shopcart ref="shopcart"
                :selectFoods="this.$store.state.selectedFoods"
                :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
    </div>
  </div>
</template>

<script>
import header from './components/header/header';
import { getSeller } from './api/index';
import shopcart from './components/shopcart/shopcart';
export default {
  data () {
    return {
      seller: {},
      userID: 123
    };
  },
  watch: {

  },
  created () {
    getSeller().then((res) => {
      this.seller = res;
    });
  },
  components: {
    'v-header': header,
    'shopcart': shopcart
  }
};
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl'
#app
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    text-align center
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    a
      display block
      flex 1
      font-size 14px
      color rgb(77, 85, 93)
      &.active
        color rgb(240, 20, 20)
</style>
