<template>
  <div class="shopcart">
    <div class="shopcart-wrapper">
      <div class="cart-left"
           @click="changeStatus">
        <div class="shopcart-icon">
          <div class="inner icon-shopping_cart"
               :class="{'select-icon':(totalPrice>0)}"></div>
          <div class="number-icon"
               v-show="totalNumber">{{showNumber}}</div>
        </div>
        <div class="price"
             :class="{'select-price':(totalPrice>0)}"> ￥{{totalPrice}}</div>
        <div class="deliveryPrice">另需配送费￥{{deliveryPrice}}元</div>
      </div>

      <div class="cart-right">
        <div class="minPrice"
             :class="{'settlement':totalPrice-minPrice>=0}"><span>{{payText}}</span></div>
      </div>

    </div>
    <transition name="show">
      <div class="shopcart-detail"
           v-show="detailStatus">
        <div class="shopcart-header">
          <span class="title">购物车</span>
          <span class="empty"
                @click="empty">清空</span>
        </div>
        <ul class="shopcart-content">
          <li v-for="(item,index) in selectFoods"
              :key="index"
              class="select-item border-1px">
            <div class="name">{{item.name}}</div>
            <div class="select-item-right">
              <span class="price">￥<span class="price_inner">{{item.specfoods[0].price  * item.count}}</span></span>
              <cart-control class="cart-control"
                            :food="item" :shopId="shopId"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <div class="mask"
         v-show="detailStatus"></div>

    <div class="ball-container">
      <transition-group @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter"
                        name="drop">
        <div v-for="(ball,index) in balls"
             :key="index"
             v-show="ball.show"
             class="ball">
          <div class="ball_inner"></div>
        </div>
      </transition-group>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import cartControl from '../cart-control/cart-control';
import { mapState, mapMutations } from 'vuex';
const BALL_NUMBER = 5;
export default {
  data () {
    return {
      totalPrice: 0,
      totalNumber: 0,
      detailStatus: false,
      selectFoods: [],
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      popBalls: []
    };
  },
  props: {
    deliveryPrice: Number,
    minPrice: Number,
    shopId: String
  },
  methods: {
    changeStatus () {
      if (!this.totalPrice) {
        this.detailStatus = false;
        return;
      };
      this.detailStatus = !this.detailStatus;
    },
    empty () {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    _ballDrop (target) {
      for (let i = 0; i < BALL_NUMBER; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true;
          this.balls[i].el = target;
          this.dropBalls.push(i);
          break;
        }
      }
      console.log(this.balls);
    },
    beforeEnter (ele) {
      console.log(ele);
      let index = this.dropBalls.shift();
      this.popBalls.push(index);
      let x = this.balls[index].el.getBoundingClientRect().left - 32;
      let y = -(window.innerHeight - this.balls[index].el.getBoundingClientRect().top - 22);
      ele.style.webkitTransform = `translate3d(${x}px,0,0)`;
      ele.style.transform = `translate3d(${x}px,0,0)`;
      ele.querySelector('.ball_inner').style.webkitTransform = `translate3d(0, ${y}px, 0)`;
      ele.querySelector('.ball_inner').style.transform = `translate3d(0, ${y}px, 0)`;
    },
    enter (ele) {
      this.$nextTick(() => {
        ele.style.webkitTransform = 'translate3d(0,0,0)';
        ele.style.transform = 'translate3d(0,0,0)';
        ele.querySelector('.ball_inner').style.webkitTransform = `translate3d(0, 0, 0)`;
        ele.querySelector('.ball_inner').style.webkitTransform = 'translate3d(0,0,0)';
      });

      // ele.style.bottom = bottom;
    },
    afterEnter (ele) {
      let index = this.popBalls.shift();
      this.balls[index].show = false;
    }
  },
  watch: {
    selectFoods: {
      handler (val, oldVal) {
        // console.log('watch', this.selectFoods);
        let price = 0;
        let number = 0;
        val.forEach(food => {
          if (food.count) {
            price += food.specfoods[0].price * food.count;
            number += food.count;
          };
        });
        this.totalPrice = price;
        this.totalNumber = number;
      },
      deep: true
    },
    totalNumber (val, oldVal) {
      if (val === 0) {
        console.log(val);
        this.detailStatus = false;
      }
    },
    cartClick (val, oldVal) {
      console.log(val);
      this._ballDrop(this.$store.state.cartClickTarget);
    }

  },
  computed: {
    ...mapState([
      'latitude', 'longitude', 'cartList'
    ]),
    payText () {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '起送';
      } else if (this.totalPrice < this.minPrice) {
        return '还差￥' + (this.minPrice - this.totalPrice) + '起送';
      } else {
        return '结算';
      }
    },
    showNumber () {
      if (this.totalNumber > 99) {
        return '99+';
      } else {
        return this.totalNumber;
      }
    },
    cartClick () {
      return this.$store.state.cartClickStatus;
    }
  },

  components: {
    'cart-control': cartControl
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable'
.shopcart
  position fixed
  bottom 0
  left 0
  width 100%
  height 48px
  z-index 50
  .shopcart-wrapper
    display flex
    .cart-left
      flex 1
      background-color #141d27
      font-size 0
      .shopcart-icon
        position absolute
        left 12px
        bottom 2px
        width 56px
        height 56px
        border-radius 28px
        color rgba(255, 255, 255, 0.4)
        background-color #141d27
        display flex
        align-items center
        justify-content center
        .inner
          width 44px
          height 44px
          border-radius 28px
          background-color #2B333B
          text-align center
          font-size 24px
          line-height 48px
          &.select-icon
            background-color rgb(0, 160, 220)
            color rgb(255, 255, 255)
        .number-icon
          position absolute
          left 26px
          bottom 38px
          width 24px
          height 16px
          text-align center
          font-size 9px
          font-weight 700
          line-height 16px
          color rgb(255, 255, 255)
          background-color rgb(240, 20, 20)
          box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
          border-radius 12px
      .price
        display inline-block
        margin 12px 0 12px 80px
        padding-right 12px
        font-size 16px
        color rgba(255, 255, 255, 0.4)
        font-weight 700
        line-height 24px
        border-right 1px solid rgba(255, 255, 255, 0.1)
        &.select-price
          color rgb(255, 255, 255)
      .deliveryPrice
        display inline-block
        margin 12px
        font-size 10px
        color rgba(255, 255, 255, 0.4)
        font-weight 200
        line-height 24px
    .cart-right
      flex 0 0 105px
      width 105px
      .minPrice
        padding 12px
        text-align center
        font-size 12px
        font-weight 700
        line-height 24px
        background-color #2B333B
        color rgba(255, 255, 255, 0.4)
        &.settlement
          background-color #00b43c
          color rgb(255, 255, 255)
  .shopcart-detail
    position absolute
    left 0
    bottom 48px
    width 100%
    z-index -1
    transition all 0.5s
    &.show-enter, &.show-leave-to
      transform translate3d(0, 100%, 0)
    .shopcart-header
      height 40px
      line-height 40px
      padding 0 18px
      background-color #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        font-weight 200
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .shopcart-content
      max-height 217px
      overflow auto
      background RGB(255, 255, 255)
      .select-item
        height 48px
        padding 12px 0
        margin 0 18px
        box-sizing border-box
        border-1px($color-row-line)
        .name
          float left
          font-size 14px
          line-height 24px
        .select-item-right
          float right
          height 24px
          .price
            margin-left 18px
            font-size 10px
            line-height 24px
            color rgb(240, 20, 20)
            .price_inner
              font-size 14px
              margin-right 12px
              font-weight 700
          .cart-control
            display inline-block
            vertical-align top
  .mask
    position fixed
    top 0
    left 0
    z-index -100
    width 100%
    height 100%
    background-color rgba(7, 17, 27, 0.6)
  .ball
    &.drop-enter-active
      transition all 0.4s linear
      .ball_inner
        transition all 0.4s cubic-bezier(0.56, -0.71, 0.7, -0.09)
    .ball_inner
      position fixed
      z-index 111
      left 32px
      bottom 22px
      width 16px
      height 16px
      border-radius 50%
      background-color RGB(0, 160, 220)
</style>
