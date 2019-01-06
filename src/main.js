import Vue from 'vue'
import App from './App.vue'
import Promise from 'es6-promise';
import ElementUI from 'element-ui';
import router from './router/index'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';
import '../public/font/iconfont.css'
import i18n from './lang';
// 使用axios兼容ie9+
Promise.polyfill();
//使用element,并设置国际化
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});
// 使用lodash工具库
Vue.prototype.$lodash = require('lodash');
//国际化标准


import $http from './utils/http';

Vue.config.productionTip = false;


Vue.prototype.$http = $http.Axios;
Vue.prototype.$post = $http.post;
Vue.prototype.$get = $http.get;
Vue.prototype.$postData = $http.postData;
Vue.prototype.$fileUpload = $http.fileUpload;
Vue.prototype.$download = $http.download;


//使用mock模拟数据
require('./mock');

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
