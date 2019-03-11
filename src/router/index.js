import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const login = () => import('@/project/lamp/login');
const routes = [
    {
        path: '/',
        name: '登录',
        component: login,
    },{
        path: '/login',
        name: '登录',
        component: login,
    }
];


export default new Router({
    mode: 'history',
    routes: routes
})
