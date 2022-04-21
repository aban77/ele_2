<template>
<div class="address">
  <div class="add-button"><button @click="$router.push('/profile/info/address/addAddress')">新增地址</button></div>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
export default {

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.address
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #f2f2f2;
  z-index: 99;
  .add-button
    display: flex;
    justify-content: center

</style>
