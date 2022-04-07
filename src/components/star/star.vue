<template>
  <div class="star" >
    <div :class="starSizeClass">
      <span v-for="(itemClass, index) in itemClasses" :key="index" class="star-item" :class="itemClass"
      ></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLSON = 'on';
const CLSHALF = 'half';
const CLSOFF = 'off';
export default {
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starSizeClass() {
      return 'star-' + this.size;
    },
    itemClasses() {
      let result = [];
      let parseScore = parseInt(this.score * 2);
      let inter = parseInt(parseScore / 2);
      let halfFlag = parseScore % 2;
      // console.log('inter', inter);
      // console.log('halfFlag', halfFlag);
      for (let i = 0; i < LENGTH; i++) {
        if (i < inter) {
          result.push(CLSON);
        }
        else if (i === inter) {
          if (halfFlag) {
            result.push(CLSHALF);
          }else{
            result.push(CLSOFF);
          }
        }
        else{
          result.push(CLSOFF);
        }
      }
      console.log(result);
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.star
  display: flex
  align-items: center
  justify-content: center

  .star-item
    display: inline-block
    background-repeat: no-repeat
  .star-48
    margin-left:22px
    .star-item
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px  
    .on
      bg-image('star48_on')
    .half
      bg-image('star48_half')
    .off
      bg-image('star48_off')
  .star-36
    margin-left:6px
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px  
    .on
      bg-image('star36_on')
    .half
      bg-image('star36_half')
    .off
      bg-image('star36_off')
  .star-24
    margin-left:3px
    .star-item
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px  
    .on
      bg-image('star24_on')
    .half
      bg-image('star24_half')
    .off
      bg-image('star24_off')
</style>
