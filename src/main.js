import Vue from 'vue'
import App from './App.vue'
import Promise from 'es6-promise';
import ElementUI from 'element-ui';
import router from './router/index'
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css'
import i18n from './lang';
import $http from './utils/http';
import {baseUrl, baseImgUrl} from './config/config'
// import Validator from 'vue-validator';
// import VeeValidate from 'vee-validate';
import xcomponents from './xcomponents';
import style from './xcomponents/style';

// var Validator = require('vue-validator');
// Vue.use(Validator);
// const config = {
//     errorBagName: 'errorBags', // change if property conflicts.
//     fieldsBagName: 'fieldBags',
// };
// Vue.use(VeeValidate,config);
Vue.use(xcomponents);

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
require('./mock.js');

Vue.prototype.$baseUrl = baseUrl;
Vue.prototype.$baseImgUrl = baseImgUrl;

Vue.prototype.$axios = $http;

Vue.directive('query', {
    bind: function (el, binding, vnode) {
        if(vnode.data.model && vnode.data.model.expression) {
            if(!vnode.context.query){
                vnode.context.query={};
            }
            if(!vnode.context.query.querySymbol){
                vnode.context.query.querySymbol = {}
            }
            vnode.context.query.querySymbol[vnode.data.model.expression] = binding.value;
        }
    }
});

/** 表格编辑状态 */
Vue.prototype.$tableRowNoEdit = function(scope) {
    let vue = scope._self;
    return !(vue.selected && vue.selected.rowNumber == scope.$index);
};
Vue.prototype.$style = style;

// let query = {
//     created: function () {
//         if(!this.query){
//             this.query={};
//         }
//     }
// };
// Vue.mixin(query);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
