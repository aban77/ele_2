<template>
  <div class="cart-control">
    <transition name="move">
      <div v-show="food.num"
           class="decrease-outer"
           @click.stop="decCount (food.category_id, food.item_id, food.specfoods[0].food_id, food.specfoods[0].name,food.specfoods[0].price, food.specfoods[0].packing_fee, food.specfoods[0].sku_id, food.specfoods[0].stock)">
        <span class="icon-remove_circle_outline cart-decrease"></span>
      </div>
    </transition>
    <div v-show="food.num"
         class="cart-count">{{food.num}}</div>
    <span class="cart-add icon-add_circle"
          @click.stop="addClick(food.category_id, food.item_id, food.specfoods[0].food_id, food.specfoods[0].name, food.specfoods[0].price, '', food.specfoods[0].packing_fee, food.specfoods[0].sku_id, food.specfoods[0].stock, $event)"></span>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      foodNum: 0
    };
  },
  props: {
    food: Object,
    shopId: String

  },
  methods: {
    ...mapMutations([
      'ADD_CART', 'REDUCE_CART'
    ]),
    addClick (category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event) {
      this.ADD_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock });
      console.log('food', this.food);
      this.$store.commit('cartClickEvent', event.target);
    },
    decCount (category_id, item_id, food_id, name, price, specs) {
      this.REDUCE_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs });
    }

  }
  // computed: {
  //   ...mapState([
  //     'cartList'
  //   ])
  // }
  // watch: {

  //   cartList: {
  //     handler: function (val, oldVal) {
  //       console.log('change');
  //       let shopCart = this.cartList[this.shopId];
  //       let category_id = this.food.category_id;
  //       let item_id = this.food.item_id;
  //       if (shopCart && shopCart[category_id] && shopCart[category_id][item_id]) {
  //         let num = 0;
  //         Object.values(shopCart[category_id][item_id]).forEach((item, index) => {
  //           num += item.num;
  //         });
  //         this.foodNum = num;
  //       } else {
  //         this.foodNum = 0;
  //       }
  //     },
  //     deep: false,
  //     immediate: true

  //   }
  // }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cart-control
  font-size 0
  height 24px
  .decrease-outer, .cart-decrease
    display inline-block
    transition all 0.4s
  .cart-decrease, .cart-add
    display inline-block
    line-height 24px
    font-size 24px
    vertical-align middle
    color rgb(0, 160, 220)
    transform rotate(0)
  .move-enter, .move-leave-to
    opacity 0
    transform translate3d(24px, 0, 0)
    .cart-decrease
      transform rotate(180deg)
  .cart-count
    display inline-block
    text-align center
    width 24px
    font-size 10px
    color rgb(147, 153, 159)
    line-height 24px
    vertical-align middle
</style>
