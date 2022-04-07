<template>
  <div class="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span class="old"
                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cart-control :food="food">
          </cart-control>
        </div>
        <!-- <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0" transition="fade">加入购物车
        </div> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cartControl from '../cart-control/cart-control';
export default {
  props: {
    food: Object
  },
  components: {
    'cart-control': cartControl
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.food
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 30
  width 100%
  background #fff
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
</style>
