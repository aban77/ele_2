<template>
  <div class='confirm-order'>
    <back></back>
    <h1>确认订单</h1>

  </div>
</template>

<script type="text/ecmascript-6">
import back from '../../components/back/back';
import { getLocalStorage } from '../../api/mUtils';
import { checkout, getAddressList } from '../../api/getData';
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      shopId: null,
      geohash: '', // geohash位置信息
      shopCart: null,
      token: ''
    };
  },
  computed: {
    ...mapState([
      'cartList', 'userInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'INIT_BUYCART'
    ]),
    async initAddress() {
      let addressList = await getAddressList(this.token);
      console.log('addressList', addressList);
    },
    // 初始化数据
    async initData() {
      this.initAddress();
      console.log('初始化');
      let newArr = [];
      Object.values(this.shopCart).forEach(categoryItem => {
        Object.values(categoryItem).forEach(itemValue => {
          Object.values(itemValue).forEach(item => {
            newArr.push({
              attrs: [],
              extra: {},
              id: item.id,
              name: item.name,
              packing_fee: item.packing_fee,
              price: item.price,
              quantity: item.num,
              sku_id: item.sku_id,
              specs: [item.specs],
              stock: item.stock
            });
          });
        });
      });
      console.log('new array', newArr);
      // 检验订单是否满足条件
      this.checkoutData = await checkout(this.token, this.geohash, [newArr], this.shopId);
      console.log('订单是否符合条件:', this.checkoutData);
      // this.SAVE_CART_ID_SIG({ cart_id: this.checkoutData.cart.id, sig: this.checkoutData.sig });

      // this.showLoading = false;
    }
  },
  created() {
    this.shopId = this.$route.query.shopId;
    this.geohash = this.$route.query.geohash;
    this.token = getLocalStorage('Authorization');
    this.INIT_BUYCART();

    this.shopCart = this.cartList[this.shopId];
    this.initData();
  },
  components: {
    back: back
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.confirm-order
  h1
    text-align: center
</style>
