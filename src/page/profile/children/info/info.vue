<template>
<div class="info">
  <back></back>
  <h1 > 个人信息</h1>
  <section class="user-info">
    <div class='info-item avatar'>
      <span class="text">头像</span>
      <span class="content" style="float:right"><i class="fa fa-chevron-right arrow-right" ></i></span>
    </div>
    <div class='info-item username'>
      <span class="text">用户名</span>
      <span class="content">{{getName}}<i class="fa fa-chevron-right arrow-right"></i></span>
    </div>
    <div class='info-item address'>
      <span class="text">收获地址</span>
      <span class="content"  @click="$router.push('/profile/info/address')">修改/添加<i class="fa fa-chevron-right arrow-right"></i></span>
    </div>
    <router-view></router-view>
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
import back from '../../../../components/back/back';
import 'font-awesome/css/font-awesome.min.css';
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
  },
  components: {
    'back': back
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.info
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #f2f2f2;
  z-index: 99;
  h1
    text-align: center;
    margin:  5px auto;
  .info-item
    height: 40px;
    border-bottom 1px solid black
    display: flex;
    align-items: center;
    justify-content:space-between
    .arrow-right
      margin:0 10px
</style>
