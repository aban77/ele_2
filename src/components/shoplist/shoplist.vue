<template>
<div class="shoplist-container">
  <h1>  附近商家</h1>
  <vue-loadmore
  :on-loadmore="loadMore"
  :finished="finished">
    <div class='shop-item' @click="$router.push({path: '/shop', query: {geohash: '31.23037,121.473701', id: item.id}})" v-show="shopList" v-for="(item,index) in shopList" :key=index>
      {{item.name}}</div>
  </vue-loadmore>
</div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex';
import { getShopList } from '../../api/getData';

export default {
  data() {
    return {
      offset: 0,
      shopList: null,
      finished: false

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
    },
    loadMore(done) {
      console.log(1);
      getShopList(this.latitude, this.longitude, this.offset).then(res => {
        let arr = res;
        console.log('下拉', arr);
        this.shopList = this.shopList.concat(arr);
        if (this.shopList.length < 20) this.finished = true;
        console.log(this.finished);
        done();
      }
      );
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
    height: 50px;
    line-height: 50px;
</style>
