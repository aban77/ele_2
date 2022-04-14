<template>
<div class="shoplist-container">
  <h1>  附近商家</h1>
  <div class='shop-item' @click="$router.push({path: '/shop', query: {geohash: '31.23037,121.473701', id: item.id}})" v-show="shopList" v-for="(item,index) in shopList" :key=index>
    {{item.name}}

  </div>

</div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex';
import { getShopList } from '../../api/getData';
export default {
  data() {
    return {
      offset: 0,
      shopList: null

    };
  },
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
  methods: {
    async initData() {
      // 获取数据
      console.log('geo参数:', this.latitude, this.longitude);
      console.log('this.restaurantCategoryId', this.restaurantCategoryId);
      this.shopList = await getShopList(this.latitude, this.longitude, this.offset);
      console.log('shopList', this.shopList);
    }
  },
  computed: {
    ...mapState([
      'latitude',
      'longitude'
    ])
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shoplist-container
  overflow: auto
  border-top:1px solid black
  .shop-item
    height: 30px;
    line-height: 30px;
</style>
