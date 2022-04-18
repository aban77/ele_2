import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../api/mUtils';
// import Vue from 'vue';
export default {
  ADD_CART(state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    packing_fee,
    sku_id,
    stock
  }) {
    let cart = JSON.parse(JSON.stringify(state.cartList));
    // console.log('getcart-cart', cart);
    // debugger;
    let shop = cart[shopid] = (cart[shopid] || {});
    // let shop1 = Vue.set(cart, shopid + '1', {});
    // console.log('getcart-cart', cart);
    // console.log('getcart-shop', shop);
    // console.log('getcart-shop', shop1);
    // debugger;
    let category = shop[category_id] = (shop[category_id] || {});
    // console.log('getcart-cart', cart);
    // console.log('getcart-shop', shop);
    // console.log('getcart-category', category);
    // debugger;
    let item = category[item_id] = (category[item_id] || {});
    // console.log('getcart-cart', cart);
    // console.log('getcart-shop', shop);
    // console.log('getcart-category', category);
    // console.log('getcart-item', item);
    // debugger;
    if (item[food_id]) {
      item[food_id]['num']++;
    } else {
      item[food_id] = {
        'num': 1,
        'id': food_id,
        'name': name,
        'price': price,
        'specs': specs,
        'packing_fee': packing_fee,
        'sku_id': sku_id,
        'stock': stock
      };
    }
    state.cartList = { ...cart };

    // console.log('getcart', cart);
    // console.log('getcart', { ...cart });
    // console.log('getcart', Object.assign({}, cart));
    // 存入localStorage
    setLocalStorage('buyCart', JSON.stringify(state.cartList));
  },
  REDUCE_CART(state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs
  }) {
    let cart = JSON.parse(JSON.stringify(state.cartList));
    let shop = (cart[shopid] || {});
    let category = (shop[category_id] || {});
    let item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--;

        // 存入localStorage
        // 这里缺少了数量为0 清除的判断
        // 如果不清除以后会越来越耗费内存
        if (item[food_id]['num'] === 0) delete item[food_id];
        if (Object.keys(category[item_id]).length === 0) delete category[item_id];
        if (Object.keys(shop[category_id]).length === 0) delete shop[category_id];
        if (Object.keys(cart[shopid]).length === 0) cart = null;
        state.cartList = { ...cart };
        console.log('getcart -category.id', state.cartList);
        setLocalStorage('buyCart', JSON.stringify(state.cartList));
      } else {
        // 商品数量为0，则清空当前商品的信息
        item[food_id] = null;
      }
    }
  },
  // 网页初始化时从本地缓存获取购物车数据
  INIT_BUYCART(state) {
    let initCart = getLocalStorage('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
      // console.log('getcarList', state.cartList);
      // console.log('getcarList', { ...state.cartList });
      // console.log('getcarList', Object.assign({}, state.cartList));
    }
  },
  // 清空当前商品的购物车信息
  CLEAR_CART(state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = { ...state.cartList };
    setLocalStorage('buyCart', JSON.stringify(state.cartList));
  },
  cartClickEvent (state, target) {
    state.cartClickStatus++;
    state.cartClickTarget = target;
    console.log('store.state', state);
  },

  selectedChange(state, foods) {
    state.selectedFoods = foods;
  },

  // 记录当前经度纬度
  RECORD_ADDRESS(state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  // 登录 存储token
  RECORD_USERINFO(state, { userInfo, token }) {
    state.userInfo = userInfo;
    state.token = token;
    state.login = true;
    setLocalStorage('Authorization', 'Bearer ' + token);
  },
  // 退出登录
  Clear_USERINFO(state) {
    console.log('退出登录');
    removeLocalStorage('Authorization');
    state.userInfo = null;
    state.token = '';
    state.login = false;
  },
  // 获取用户信息
  GET_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
    state.login = true;
  }

};
