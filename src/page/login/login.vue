<template>
<div class="login">
  <div class="login-header">
    <!-- <i></i> -->
    <span>密码登录</span>
  </div>
  <form class="loginform">
    <input type="text" placeholder="账号" name="userid" v-model="userAccount" >
    <input type="password" placeholder="密码" name="pwd" v-model="passWord">
    <section>
      <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      <img v-show="captchaCodeImg" :src="captchaCodeImg" alt="">
      <button class="codeButton" @click.prevent="getCaptchaCode">获取验证码</button>
    </section>
      <button class="loginButton" @click.prevent="userLogin">登录</button>
  </form>

</div>
</template>

<script type="text/ecmascript-6">
import { getCaptchas, accountLogin } from '../../api/getData';
import { mapMutations } from 'vuex';
import sha1 from 'js-sha1';
import md5 from 'js-md5';
import { sha256 } from 'js-sha256';

export default {
  data() {
    return {
      userAccount: '', // 用户名
      passWord: '', // 密码
      captchaCodeImg: null, // 验证码地址
      mobileCode: null, // 验证码
      userInfo: null // 获取到的用户信息
    };
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO'
    ]),
    async getCaptchaCode() {
      let res = await getCaptchas();
      console.log('res', res);
      this.captchaCodeImg = res.data.code;
      console.log('captches', this.captchaCodeImg);
    },
    async userLogin() {
      if (this.userAccount === '' || this.passWord === '') {
        alert('账号或密码不能为空');
      } else {
        let res = await accountLogin(this.userAccount, sha256(sha1(md5(this.passWord))));
        console.log('login', res);
        // 如果返回status为0,则出现问题
        if (res.status === 0) {
          alert('登录失败');
        } else if (res.status === 1) {
          this.userInfo = res.userInfo;
          this.RECORD_USERINFO({ userInfo: this.userInfo, token: res.token });
          this.$router.go(-1);
        }
      }
    }

  },
  created() {
    this.getCaptchaCode();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.login
  .login-header
    text-align: center
    height: 30px
    line-height: 30px
    background-color:RGB(49,144,232);
  input
    border: 1px solid black
</style>
