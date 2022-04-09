<template>
  <div class="profile">
  <h1 class="title">我的</h1>
  <section class="profile-login">
    <router-link >
      <div class="user-info">
        <p class="username">{{username}}</p>
        <p class="user-mobile-number">{{mobile}}</p>
      </div>
    </router-link>

  </section>

  <section class="profile-info">信息</section>
  <section class="profile-order">我的订单</section>
  <section class="profile-download">下载</section>
  <foot-guide></foot-guide>
  </div>
</template>

<script type="text/ecmascript-6">
import footGuide from '../../components/footer/footer-guide.vue';
export default {
  data() {
    return {
      username: '登录/注册', // 用户名
      mobile: '暂无绑定手机号' // 电话号码
    };
  },
  components: {
    'foot-guide': footGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.profile
  .title
    text-align: center
    line-height: 30px;
    background-color:RGB(49,144,232);
  .profile-login
    background-color:RGB(49,144,232);
    height: 60px;
    padding: 10px;
</style>
