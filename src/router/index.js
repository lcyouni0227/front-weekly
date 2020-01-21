import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const login = () => import('@/views/login');
const index = () => import('@/views/index');
const routes = [
    {
        path: '/login',
        name: '登录',
        component: login,
    }, {
        path: '/',
        name: '登录',
        component: login,
    },{
        path: '/index',
        name: '主页',
        component: index,
    }
];

export default new Router({
    routes: routes
})
