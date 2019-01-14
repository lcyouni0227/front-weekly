import Vue from 'vue'
import App from './App.vue'
import Promise from 'es6-promise';
import ElementUI from 'element-ui';
import router from './router/index'
import store from './store';
// import './mock';
// import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css'
import i18n from './lang';
import $http from './utils/http';
import {baseUrl, baseImgUrl} from './config/config'
// 使用axios兼容ie9+
Promise.polyfill();
//使用element,并设置国际化
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});
// 使用lodash工具库
Vue.prototype.$lodash = require('lodash');
//国际化标准

Vue.config.productionTip = false;
//使用mock模拟数据
// require('./mock.js');

Vue.prototype.$baseUrl = baseUrl;
Vue.prototype.$baseImgUrl = baseImgUrl;

Vue.prototype.$http = $http.Axios;
Vue.prototype.$post = $http.post;
Vue.prototype.$get = $http.get;
Vue.prototype.$fileUpload = $http.fileUpload;
Vue.prototype.$fileDown = $http.fileDown;
// Vue.prototype.$axios = axios;

// axios.interceptors.response.use(res => {
//     if (!res.data)
//         return res;
//     if (!res.data.errorCode || res.data.errorCode != 302)
//         return res;
//     sessionStorage.removeItem('user');
//     location.reload();
//     return res
// });


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
