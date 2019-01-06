import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const index = () => import('@/views/index.vue');
const layout = () => import('@/views/layout');
const notFound = () => import("@/components/common/404");

export const constantRouterMap = [{
    path: '/',
    name: 'index',
    component: layout,
    children: [{
        path: '*',
        name: '错误',
        component: notFound,
    }],
}];


export default new Router({
    scrollBehavior: {y: 0},
    routes: constantRouterMap
})
