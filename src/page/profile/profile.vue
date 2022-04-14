<template>
  <div class="profile">
  <h1 class="title">我的</h1>
  <section class="profile-login">
      <div class="user-info" @click="login && userInfo ? $router.push('/profile/info') : $router.push('/login')">
          <div class="username" >{{ username }}</div>
      </div>
      <router-view></router-view>

  </section>

  <section class="profile-info">信息</section>
  <section class="profile-order">我的订单</section>
  <section class="profile-download">下载</section>
  <foot-guide></foot-guide>
  </div>
</template>

<script type="text/ecmascript-6">
import footGuide from '../../components/footer/footer-guide.vue';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      username: '登录/注册', // 用户名
      mobile: '暂无绑定手机号' // 电话号码
    };
  },
  computed: {
    ...mapState([
      'userInfo',
      'login'
    ])

  },
  methods: {
    initData() {
      if (this.userInfo && this.login) {
        // this.avatar = this.userInfo.avatar;
        this.username = this.userInfo.username;
        this.mobile = this.userInfo.mobile || this.mobile;
        // this.balance = this.userInfo.balance;
        // this.count = this.userInfo.gift_amount;
        // this.pointNumber = this.userInfo.point;
      } else {
        this.username = '登录/注册';
        this.mobile = '暂无绑定手机号';
      }
    }
  },
  mounted() {
    this.initData();
  },
  components: {
    'foot-guide': footGuide
  },
  watch: {
    userInfo: function (value) {
      this.initData();
    }
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
