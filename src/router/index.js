import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const layout = () => import('@/views/layout');
const notFound = () => import("@/components/common/404");
const login = () => import('@/views/login');
const login1 = () => import('@/views/login/login');
const routes = [
    {
        path: '/login',
        name: '登录',
        component: login1,

    },
    {
        path: '/index',
        name: 'index',
        component: layout,
        children: [{
            path: '',
            name: '错误',
            component: notFound,
        }],
    }
];

export default new Router({
    routes: routes
})
