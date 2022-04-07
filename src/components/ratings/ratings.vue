<template>
  <div class="ratings">
    我是ratings
    <button @click="showbox">按钮{{this.$store.state.cartClickStatus}}</button>
    <transition name="move"
                @before-enter="beforeEnter"
                @enter="enter">
      <div class="mydiv"
           v-show="show"
           key="mydiv"></div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      show: false
    };
  },
  methods: {
    showbox () {
      this.show = true;
      this.$store.commit('increment', 1);
    },
    beforeEnter (ele) {
      // ele.style.display = '';
      ele.style.transform = 'translate3d(0,0,0)';
    },
    enter (ele) {
      /* eslint-disable no-unused-vars */
      let rf = ele.offsetWidth;
      this.$nextTick(() => {
        ele.style.transform = 'translate3d(100px,0,0)';
      });
    }

  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mydiv
  width 16px
  height 16px
  background-color red
  &.move-enter-active
    transition all 20s
</style>
