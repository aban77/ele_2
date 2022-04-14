import axios from 'axios';

// 获取验证码
export const getCaptchas = () => axios.post('/v1/captchas', {});

// 账号登录or注册
export function accountLogin(username, password) {
  return axios.post('/v2/login', { username, password }).then(res => res.data
  ).catch(err => console.log(err));
}

// 获取用户信息

export function getUser(Authorization) {
  if (Authorization) {
    return axios.get('/v1/user', { headers: { Authorization } }).then(res => res
    ).catch(err => err.response.status); ;
  }
}

export function getShopList(latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', deliveryMode = '', support_ids = []) {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let params = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': deliveryMode + supportStr
  };
  console.log('getdata-data', params);
  return axios.get('/shopping/restaurants', { params }).then(res => res.data
  ).catch(err => console.log(err));
}
// const ERR_OK = 0;
// export function get(url) {
//   return function (params = {}) {
//     return axios.get(url, { params: params }).then(res => {
//       let { errno, data } = res.data;
//       if (errno === ERR_OK) {
//         return data;
//       }
//     }).catch(error => console.log(error));
//   };
// }
export function getFoodList(restaurantId) {
  return axios.get('/shopping/v2/menu', { params: { restaurant_id: restaurantId } }).then(res => res.data
  ).catch(err => console.log(err));
}

export function getShopInfo(restaurantId) {
  return axios.get(`/shopping/restaurant/${restaurantId}`).then(res => res.data
  ).catch(err => console.log(err));
}
