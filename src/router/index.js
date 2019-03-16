import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const login = () => import('@/project/lamp/login');
const index = () => import('@/project/lamp/index');
const dashboard = () => import('@/project/lamp/dashboard');
const routes = [
    {
        path: '/login',
        name: '登录',
        component: login,
    }, {
        path: '/',
        component: index,
        children: [{
            path: '/dashboard',
            component: dashboard,
        }]
    }
];

export default new Router({
    mode: 'history',
    routes: routes
})
