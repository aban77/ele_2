<template>
  <div class="cart-control">
    <transition name="move">
      <div v-show="food.count>0"
           class="decrease-outer"
           @click.stop="decCount">
        <span class="icon-remove_circle_outline cart-decrease"></span>
      </div>
    </transition>
    <div v-show="food.count>0"
         class="cart-count">{{food.count}}</div>
    <span class="cart-add icon-add_circle"
          @click.stop="addClick"></span>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  props: {
    food: Object

  },
  methods: {
    addClick (event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      // let nowStatus = this.$store.state.cartClickStatus + 1;
      this.$store.commit('cartClickEvent', event.target);
    },
    decCount () {
      if (this.food.count) {
        this.food.count--;
      }
    }

  }
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
