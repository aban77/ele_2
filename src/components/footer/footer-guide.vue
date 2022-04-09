<template>
  <div class="foot-guide">
    <div class="item" @click="$router.push('/home')" >
      <i class="fa fa-home" :class="{active:$route.path.indexOf('/home')===0}"></i>
      <span class="text">首页</span>
    </div>
    <div class="item" @click="$router.push('/order')" >
      <i class="fa fa-file-text-o" :class="{active:$route.path.indexOf('/order')===0}"></i>
      <span class="text">订单</span>
    </div>
    <div class="item" @click="$router.push('/profile')" >
      <i class="fa fa-user-o" :class="{active:$route.path.indexOf('/profile')===0}"></i>
      <span class="text">我的</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import 'font-awesome/css/font-awesome.min.css';
export default {
  mounted() {
    console.log(this.$route.path.indexOf('/home'));
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.foot-guide
  position:fixed
  bottom:0
  left:0
  width: 100%
  height: 40px
  background-color: #fff;
  display: flex
  border-top: 1px solid #f1f1f1;
  .item
    flex:1
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    font-size: 14px
    line-height: 14px
    .active
      color: blue

</style>
