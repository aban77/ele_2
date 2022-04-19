<template>
  <div class="goods">
    <div class="menu-wrapper">
      <div class="menu-item "
           v-for="(item,index) in goods"
           :key="index"
           :class="{
           current:index===currentIndex}"
           @click="clickMenu(index)">
        <div class="item border-1px">
          <span>
            <support-ico class="support-ico"
                         v-show="item.type>0"
                         :size="3"
                         :type="item.type"></support-ico>
            <span class="text">{{item.name}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="foods-wrapper"
         ref="foods">
      <div class="type-wrapper"
           v-for="(item,index) in goods"
           :key="index">
        <div class="text">{{item.name}}</div>
        <ul class="food-wrapper">
          <li v-for="(foodItem,foodIndex) in item.foods"
              :key="foodIndex"
              class="food-item border-1px"
              >
            <img :src="foodItem.icon"
                 alt=""
                 class="food-icon"
                 @click="showFoodDetail(foodItem)">
            <div class="food-info">
              <div class="name">{{foodItem.name}}</div>
              <div v-show="foodItem.description"
                   class="description">{{foodItem.description}}</div>
              <div class="sell-info">
                <span class="sellCount">月售{{foodItem.month_sales}}份</span>
                <span class="rating">好评率{{foodItem.satisfy_rate}}</span>
              </div>
              <div class="price-info">
                <span class="price" v-if="foodItem.specfoods[0]">￥{{foodItem.specfoods[0].price}}</span>
                <!-- <span  class="price" v-if="foodItem.specifications.length">起</span> -->
                <s v-show="foodItem.oldPrice"
                   class="delete-price">￥<span class="oldPrice">{{foodItem.oldPrice}}</span></s>
              </div>
            </div>
            <div class="cart">
              <cart-control v-if="foodItem.specfoods[0] && !foodItem.specfoods[0].sold_out" :food="foodItem" :shopId="shopId"></cart-control>
            </div>
          </li>
        </ul>

      </div>
    </div>
    <food-detail class="food-detail"
                 :food="detailFood"
                 v-show="detailFoodShow"></food-detail>
  </div>
</template>

<script type="text/ecmascript-6">
import { getFoodList } from '../../api/getData';
import supportIco from '../support-ico/support-ico';
import cartControl from '../cart-control/cart-control';
import foodDetail from '../food-detail/food-detail';
import { mapState } from 'vuex';
export default {
  data () {
    return {
      goods: [],
      heightList: [],
      currentIndex: 0,
      detailFood: {},
      detailFoodShow: false,
      shopId: null,
      geohash: ''

    };
  },
  props: {
    seller: Object
  },
  methods: {
    calHeight () {
      let foodList = this.$refs.foods.querySelectorAll('.type-wrapper');

      for (let i = 0; i < foodList.length; i++) {
        this.heightList.push(foodList[i].offsetTop);
      }
      // console.log('calHeight', foods);
      // console.log('heightList', this.heightList);
    },
    clickMenu (index) {
      this.$refs.foods.scrollTop = this.heightList[index];
    },
    showFoodDetail (food) {
      this.detailFood = food;
      this.detailFoodShow = true;
    },
    initGoodsNum() {
      let shopCart = this.cartList[this.shopId];
      // console.log('shopchange');
      // console.log(this.goods);
      // console.log(this.cartList);
      this.goods.forEach((item) => {
        if (shopCart && shopCart[item.foods[0].category_id]) {
          item.foods.forEach(food => {
            let num = 0;
            if (shopCart[item.foods[0].category_id][food.item_id]) {
              Object.keys(shopCart[item.foods[0].category_id][food.item_id]).forEach(foodid => {
                let foodItem = shopCart[item.foods[0].category_id][food.item_id][foodid];
                num += foodItem.num;
              });
              this.$set(food, 'num', num);
            } else {
              this.$set(food, 'num', num);
            }
          }
          );
        } else {
          item.foods.forEach(food => { this.$set(food, 'num', 0); });
        }
      });
    },
    async getGoods (id) {
      this.goods = await getFoodList(id);
      console.log('this.goods', this.goods);
      this.$nextTick(() => {
        this.calHeight();
        this.initGoodsNum();
      });
    }
  },
  created () {
    this.geohash = this.$route.query.geohash;
    this.shopId = this.$route.query.id;
    this.getGoods(this.shopId);
  },
  mounted () {
    this.$refs.foods.addEventListener('scroll', (event) => {
      let scrollY = this.$refs.foods.scrollTop + 5;
      // console.log('scrollY', scrollY);
      for (let i = 0; i < this.heightList.length - 1; i++) {
        if (scrollY > this.heightList[i] && scrollY < this.heightList[i + 1]) {
          this.currentIndex = i;
        }
      }
      if (scrollY > this.heightList[this.heightList.length - 1]) {
        this.currentIndex = this.heightList.length - 1;
      }
      // console.log('this.currentIndex', this.currentIndex);
    });
  },
  components: {
    'support-ico': supportIco,
    'cart-control': cartControl,
    'food-detail': foodDetail
  },
  watch: {
    cartList: {
      handler() {
        this.initGoodsNum();
      }
    }

  },
  computed: {
    ...mapState([
      'cartList'
    ])

    // shopCart: function () {
    //   return { }; // 返回this.cartList[this.shopId]的复制
    // }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable'
.goods
  position absolute
  top 174px
  bottom 48px
  width 100%
  display flex
  .menu-wrapper
    width 80px
    overflow auto
    background-color $color-background-ssss
    &::-webkit-scrollbar
      display none
    .menu-item
      padding 0 12px
      font-size 12px
      line-height 14px
      &.current
        background-color rgb(255, 255, 255)
        font-weight bold
      .item
        display flex
        align-items center
        height 54px
        width 56px
        border-1px($color-row-line)
        .support-ico
          vertical-align middle
          margin-right 2px
        .text
          font-weight 200
          vertical-align middle
  .foods-wrapper
    flex 1
    overflow auto
    &::-webkit-scrollbar
      display none
    .type-wrapper
      width 100%
      .text
        height 26px
        line-height 26px
        font-size 12px
        color rgb(147, 153, 159)
        padding-left 14px
        border-left 2px solid #d9dde1
        background-color $color-background-ssss
      .food-wrapper
        & li:last-child
          // background-color red
          margin-bottom 0
      .food-item
        position relative
        display flex
        margin 18px
        padding-bottom 18px
        border-1px($color-row-line)
        .food-icon
          width 57px
          height 57px
        .food-info
          margin-left 10px
          margin-top 2px
          font-size 10px
          color rgb(147, 153, 159)
          .name
            font-size 14px
            color rgb(7, 17, 27)
            line-height 14px
          .description, .sell-info
            margin-top 8px
            line-height 14px
          .rating
            margin-left 12px
          .price-info
            line-height 24px
            color rgb(240, 20, 20)
            .price
              font-size 14px
              font-weight 700
            .delete-price
              margin-left 8px
              color rgb(147, 153, 159)
            .oldPrice
              font-weight 700
        .cart
          position absolute
          right 0
          bottom 18px
</style>
