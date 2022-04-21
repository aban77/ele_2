<template>
<div class="back">
  <i class="fa fa-chevron-left backIcon" @click="$router.go(-1)"></i>
</div>
</template>

<script type="text/ecmascript-6">
import 'font-awesome/css/font-awesome.min.css';
export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.back
  .backIcon
    position fixed
    left 5px
    top 5px
    z-index: 100
</style>
