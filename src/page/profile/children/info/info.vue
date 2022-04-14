<template>
<div class="info">
  <button class="goback" @click="$router.go(-1)">返回</button>
  <h1>  我是profile-info</h1>
  <section class="user-info">
    <div class='avatar'>头像</div>
    <div class='username'>用户名：{{getName}}</div>
    <div class='username' >收获地址</div>
  </section >
  <!-- <section class="bind-phone">
    <div>
      <h2>账号绑定</h2>
    </div>
  </section> -->
  <section class="security">
      <p>安全设置</p>
      <p>登录密码 </p>
  </section>
  <button @click="signOut">退出登录</button>
  </div>

</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState([
      'userInfo'
    ]),
    getName() {
      if (this.userInfo) return this.userInfo.username;
      else return '';
    }
  },
  methods: {
    ...mapMutations([
      'Clear_USERINFO'
    ]),
    signOut() {
      this.$router.go(-1);
      this.Clear_USERINFO();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.info
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 202;
  .goback
    height:30px;
    line-height:30px

</style>
