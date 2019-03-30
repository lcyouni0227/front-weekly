import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const login = () => import('@/project/lamp/login');
const index = () => import('@/project/lamp/index');
const routes = [
    {
        path: '/login',
        name: '登录',
        component: login,
    }, {
        path: '/',
        component: index,
    }
];

export default new Router({
    mode: 'history',
    routes: routes
})
