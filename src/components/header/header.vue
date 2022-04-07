<template>
  <div class="header">
    <div class="header-content">
      <img :src="seller.avatar" class="header-avatar" alt="" />
      <div class="header-info">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
          <span class="supports-description">{{
            seller.supports[0].description
          }}</span>
        </div>
      </div>
      <div class="support-number" v-if="seller.supports" @click="showDetail">
        <span class="number">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-bulletin">
      <span class="bulletin-logo"></span>
      <span class="bulletin-content">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
    </div>
    <div class="header-background">
      <img :src="seller.avatar" />
    </div>
    <header-detail
      v-if="detailFlag"
      :seller="seller"
      @closeDetail="closeDetail"
    ></header-detail>
  </div>
</template>

<script type="text/ecmascript-6">
import supportIco from '../support-ico/support-ico';
import headerDetail from '../header-detail/header-detail';
export default {
  data() {
    return {
      detailFlag: false
    };
  },
  props: {
    seller: Object
  },
  methods: {
    showDetail() {
      this.detailFlag = true;
    },
    closeDetail() {
      this.detailFlag = false;
    }
  },
  components: {
    'support-ico': supportIco,
    'header-detail': headerDetail
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable'
.header
  position: relative
  overflow: hidden
  background-color: $color-background-ss
  .header-content
    height:64px
    position: relative
    padding: 24px 12px 18px 24px
    color: rgb(255, 255, 255)
    .header-avatar
      width: 64px
      height: 64px
      border-radius: 2px
    .header-info
      display: inline-block
      vertical-align: top
      margin-left: 16px
      .title
        display: flex
        align-items: center
        margin-top: 2px
        margin-bottom: 8px
        .brand
          width: 30px
          height: 18px
          display: inline-block
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          font-weight: bold
          line-height: 18px
      .description
        margin-bottom: 8px
        font-size: 12px
        font-weight: 200px
        line-height: 12px
      .supports
        display: flex
        align-items: center
        .supports-description
          margin-left: 4px
          font-size: 10px
          font-weight: 200
          line-height: 12px
    .support-number
      position: absolute
      right: 12px
      bottom: 14px
      display: flex
      align-items: center
      height: 24px
      padding: 0 8px
      text-align: center
      border-radius: 14px
      background-color: $color-background-sss
      .number
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px
        font-size: 10px
  .header-bulletin
    position: relative
    display: flex
    align-items: center
    width: 100%
    height: 28px
    line-height: 28px
    background-color: $color-background-sss
    color: rgb(255, 255, 255)
    .bulletin-logo
      width: 22px
      height: 12px
      margin-left: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-content
      flex: 1
      margin-left: 4px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      width: 100%
      font-size: 10px
      line-height: 28px
    .icon-keyboard_arrow_right
      margin-right: 10px
      width: 10px
      font-size: $fontsize-small-s
  .header-background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
    img
      width: 100%
</style>
