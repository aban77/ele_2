<template>
<div class="add-address">
<h1>新增地址</h1>
<form class='new-address'>
  <div class="detail-address">
    <span class="text" >收获地址:</span>
    <input type="text" class="content" placeholder="请输入收获地址" v-model="address">
  </div>
  <div class="detail-address">
    <span class="text" >门牌号:</span>
    <input type="text" class="content" placeholder="详细地址，例:16号楼5层501" v-model="addressDetail">
  </div>
  <div class="detail-address">
    <span class="text">联系人:</span>
    <input type="text" class="content" placeholder="请填写收货人姓名" v-model="name">
  </div>
  <div class="detail-address">
    <span class="text"></span>
    <div class="gender">
      <input type="radio" name="gender" value="1" v-model='sex' checked= true>先生
      <input type="radio" name="gender"  value="0" v-model='sex'>女士
    </div>

  </div>
  <div class="detail-address">
    <span class="text">手机号:</span>
    <input type="text" class="content" placeholder="请填写收货人手机号" v-model='telephone'>
  </div>
  <div class="detail-address">
    <span class="text">备用手机号:</span>
    <input type="text" class="content" placeholder="备用联系电话（选填）" v-model='telephoneBk'>
  </div>
    <div class="tag">
      <input type="radio" name="tag" value="3" v-model='tag' >家
      <input type="radio" name="tag"  value="4" v-model='tag'>学校
      <input type="radio" name="tag"  value="4" v-model='tag'>公司
    </div>
    <button @click.prevent="submit">保存</button>
</form>
</div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex';
import { getLocalStorage } from '../../../../../../api/mUtils';
import { addNewAddress } from '../../../../../../api/getData';
export default {
  data() {
    return {
      address: '',
      addressDetail: '',
      name: '', // 信息
      sex: 1,
      telephone: '', // 手机号
      telephoneBk: '',
      tag: '家',
      tagType: 3

    };
  },
  methods: {
    async submit() {
      let token = getLocalStorage('Authorization');
      if (token) {
        if (this.address && this.addressDetail && this.name && this.telephone) {
          switch (parseInt(this.tagType)) {
            case 3:
              this.tag = '家';
              break;
            case 4:
              this.tag = '学校';
              break;
            case 5:
              this.tag = '公司';
              break;
          }
          let res = await addNewAddress(token, this.address, this.addressDetail, this.geohash, this.name, this.telephone, this.telephoneBk, 0, parseInt(this.sex), this.tag, parseInt(this.tagType));
          if (res.status === 0) {
            // this.showAlert = true;
            // this.alertText = res.message;
            alert(res.message);
            // if()
          } else {
            alert('保存成功');
            this.$router.go(-1);
          }
        }
      }
    }
  },
  computed: {
    ...mapState([
      'userInfo', 'geohash'
    ])

  }

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.add-address
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
  .detail-address
    height: 30px;
    display: flex;
    align-items: center;
    .text
      display: inline-block;
      width:100px

</style>
