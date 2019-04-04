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
import components from './components';
import style from './components/support/style';
import dic from './components/support/global';
import VTooltip from 'v-tooltip'
import './components/style/common.css'

Vue.use(VTooltip);

// var Validator = require('vue-validator');
// Vue.use(Validator);
// const config = {
//     errorBagName: 'errorBags', // change if property conflicts.
//     fieldsBagName: 'fieldBags',
// };
// Vue.use(VeeValidate,config);
Vue.use(components);

// 使用axios兼容ie9+
Promise.polyfill();
//使用element,并设置国际化
Vue.use(ElementUI, {
    size: 'small',
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
Vue.prototype.$dic = dic;

/**
 * 字典翻译
 * value:值
 * name:字典名称
 */
Vue.filter('dic', function(value, name) {
    return dic.getDic(value,name);
});

/**
 * 遍历后台传来的路由字符串,转换为组件对象
 * @param asyncRouterMap
 * @returns {*}
//  */
function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(route => {
        if (route.component) {
            let v=route.component;
             route.component = resolve => require(['@/project/'+ v +'.vue'], resolve)
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    });
}

/**
 * 路由检查
 */
router.beforeEach((to, from, next) => {
    if(!store.state.controlStyle.menu && to.fullPath !=='/login') {
        $http.postJson('/getMenu', {}).then(res => {
            if(res.code==1) {
                let menu = filterAsyncRouter(res.data);
                store.commit('setMenu', menu);
                router.addRoutes(menu);
                next({...to, replace: true})
            }
        }).catch(() => {
        });
    }else{
        next({replace: true })
    }
});

Vue.prototype.$style = style;

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
});
