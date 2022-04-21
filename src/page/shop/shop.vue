<template>
  <div class="shop">
    <back></back>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link :to="{path:'/shop/goods',query:{geohash: '31.23037,121.473701', id: shopId}}" >商品</router-link>
      <router-link to="/shop/ratings">评价</router-link>
      <router-link to="/shop/seller">商家</router-link>

    </div>
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
    <div class="shopcart-wrapper">
      <shopcart ref="shopcart"
                :deliveryPrice="seller.float_delivery_fee"
                :minPrice="seller.float_minimum_order_amount"
                :shopId='shopId'
                :geohash='geohash'></shopcart>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import header from '../../components/header/header';
import { getShopInfo } from '../../api/getData';
import shopcart from '../../components/shopcart/shopcart';
import back from '../../components/back/back';
export default {
  data () {
    return {
      seller: {},
      shopId: null,
      geohash: '', // geohash位置信息
      goods: []
    };
  },
  methods: {
    ...mapMutations([
      'INIT_BUYCART'
    ]),
    async getSeller(id) {
      this.seller = await getShopInfo(id);
      console.log('seller', this.seller);
    },
    getGoods(arr) {
      this.goods = arr;
      console.log('shop', this.goods);
    }
  },
  created() {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    this.getSeller(this.shopId);
  },
  mounted() {
    this.INIT_BUYCART();
  },
  components: {
    'v-header': header,
    'shopcart': shopcart,
    'back': back
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.shop

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
