<template>
  <div class="header-detail">
    <div class="header-container">
      <div class="detail-wrapper">
        <div class="detail-content">
          <div class="seller-title">
            <h1 class="name">{{ seller.name }}</h1>
            <star :size='48'
                  :score='seller.score'></star>
          </div>

          <div class="title">
            <div class="line"></div>
            <h2 class="text">优惠信息</h2>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports"
              class="discount-detail">
            <li v-for="(item, index) in seller.supports"
                :key="index"
                class="discount-item">
              <support-ico :size="2"
                           :type="item.type"></support-ico>
              <span class="discount-description">{{ item.description }}</span>
            </li>
          </ul>

          <div class="title">
            <div class="line"></div>
            <h2 class="text">商家公告</h2>
            <div class="line"></div>
          </div>
          <div class="bulletin"> {{ seller.bulletin }}</div>
        </div>
      </div>
      <div class="close"><i class="icon-close"
           @click="$emit('closeDetail')"></i></div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import supportIco from '../support-ico/support-ico';
import star from '../star/star';
export default {
  props: {
    seller: Object
  },
  components: {
    'support-ico': supportIco,
    'star': star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" >
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable'
.header-detail
  position fixed
  top 0
  left 0
  z-index 111
  overflow hidden
  width 100%
  height 100%
  font-size 12px
  font-weight 200
  color rgb(255, 255, 255)
  background-color $color-background-s
  backdrop-filter blur(10px)
  .header-container
    width 100%
    height 100%
    overflow auto
    &::-webkit-scrollbar
      display none
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-content
        padding-top 64px
        padding-bottom 64px
        .seller-title
          display flex
          flex-direction column
          align-items center
          .name
            font-size 16px
            font-weight 700
            line-height 16px
            text-align center
            margin-bottom 16px
      .title
        margin-top 28px
        display flex
        justify-content center
        .line
          width 112px
          position relative
          top -6px
          border-bottom 1px solid rgba(255, 255, 255, 0.2)
        .text
          padding 0 12px
          font-weight 700
          font-size 14px
      .discount-detail
        margin 24px 48px 28px 48px
        .discount-item
          display flex
          align-items center
          margin-bottom 12px
          .discount-description
            margin-left 6px
            font-size 12px
      .bulletin
        margin 24px 48px 28px 48px
        line-height 24px
    .close
      margin-top -64px
      text-align center
      font-size 32px
      color rgba(255, 255, 255, 0.5)
</style>
