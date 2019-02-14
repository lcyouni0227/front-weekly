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
import global from './components/support/global';
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
Vue.prototype.$global = global;

Vue.filter('dic', function(value, name) {
    for (let v of global.dic[name].data) {
        if(v[global.dic[name].valueField] == value){
            return v[global.dic[name].labelField];
        }
    }
    // if(global.dic[name] && global.dic[name].status == 'ok'){
    //     console.log(111111)
    //     // for (let v of global.dic[name].data) {
    //     //     if(v[datasource.valueField] == value){
    //     //         return v[datasource.labelField];
    //     //     }
    //     // }
    // }else{
    //     // while (global.dic[name].status == 'run') {
    //     //     console.log('122222222222');
    //     // }
    //     //
    //     global.dic[name]={status:'run'};
    //     let query=global.getDataSource(datasource);
    //     query.fields = [datasource.valueField,datasource.labelField];
    //
    //     $http.postJson(datasource.url || '/data/query',query).then((res)=>{
    //         // console.log(res);
    //         if(res.code==1) {
    //             global.dic[name] = {status:'ok',data:res.data.rows};
    //             // store.commit('setDic',{name:name,data:res.data.rows});
    //             // console.log(global.dic[name]);
    //             // componentData[name] = res.data.rows;
    //             for (let v of res.data.rows) {
    //                 if(v[datasource.valueField] == value){
    //                     return v[datasource.labelField];
    //                 }
    //             }
    //
    //         }else{
    //             global.dic[name] = {status:'ok',data:[]};
    //             // componentData[name] = [];
    //             // store.commit('setDic',{name:name,data:[]});
    //         }
    //         console.log(global.dic[name])
    //     }).catch(() => {
    //         global.dic[name] = {status:'ok',data:[]};
    //         // componentData[name] = [];
    //         // store.commit('setDic',{name:name,data:[]});
    //     });
    //     // componentData[name] = [{sysid:'1',name:'kkk'},{sysid:'cloud',name:"dddddd"}];
    // }

});

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
    return asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {//Layout组件特殊处理
                // route.component = Layout
            } else {
                let v=route.component;
                // route.component = resolve => require.ensure([], () => resolve(require('@/views/'+ v +'.vue')));
                route.component = resolve => require(['@/views/'+ v +'.vue'], resolve)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    });
}

router.beforeEach((to, from, next) => {
    if(!store.state.controlStyle.menu) {
        $http.get('/getMenu', {}, true, false).then(res => {
            let menu = filterAsyncRouter(res.data);
            store.commit('setMenu',menu);
            // localStorage.setItem("menu",JSON.stringify(menu));
            router.addRoutes(menu);
            next({ ...to, replace: true })
        }).catch(() => {

        });

    }else{
        next({replace: true })
    }
});

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
