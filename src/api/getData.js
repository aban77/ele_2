import axios from 'axios';

export const getCaptchas = () => axios.post('/v1/captchas', {});
export const accountLogin = (accountInfo) => axios.post('v2/login', accountInfo);
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
