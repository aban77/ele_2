import { getUser } from '../api/getData';

// import { GET_USERINFO } from './mutations.js';
export default {
  async getUserInfo({ commit }, token) {
    console.log('actionstoken', typeof token);
    let res = await getUser(token);
    // 如果前端拿到状态码为401，就清除token信息并跳转到登录页面
    console.log('status', res);
    if (typeof res === 'number') {
      if (res === 401) {
        commit('Clear_USERINFO');
      }
    } else {
      commit('GET_USERINFO', res.data);
    }
  }
};
