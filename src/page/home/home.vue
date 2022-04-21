<template>
<div class="home">
  <h1>我是home</h1>
  <div class="username" v-if="login">hello {{userInfo.username}}</div>
  <div class="username" v-if="!login" @click="$router.push('/login')">请登录</div>
  <shop-list ></shop-list>
  <foot-guide></foot-guide>
</div>

</template>

<script type="text/ecmascript-6">
import footGuide from '../../components/footer/footer-guide.vue';
import shoplist from '../../components/shoplist/shoplist.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  components: {

    'foot-guide': footGuide,
    'shop-list': shoplist
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS'
    ])
  },
  computed: {
    ...mapState([
      'userInfo',
      'login'
    ])
  },
  created() {
    // 在选择城市时，将地理位置存到localstorage 否则其他页面刷新路由会丢失geo数据(后面改)
    let geo = { latitude: '31.23037', longitude: '121.473701' };
    this.RECORD_ADDRESS(geo);
  }

};

// import axios from 'axios';
// export default {
//   mounted() {
//     axios.get('/shopping/restaurants?latitude=31.22967&longitude=121.4762').then(res => {
//       console.log(res);
//     }).catch(error => console.log(error));
//   }
// };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home
  display: relative
  height: 100%
  width: 100%
</style>
