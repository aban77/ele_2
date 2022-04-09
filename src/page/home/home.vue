<template>
<div>我是home
  <foot-guide></foot-guide>
</div>
</template>

<script type="text/ecmascript-6">
import footGuide from '../../components/footer/footer-guide.vue';
export default {
  components: {
    'foot-guide': footGuide
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
</style>
