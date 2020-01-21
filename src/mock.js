//引入mockjs
import Mock from 'mockjs';
//使用mockjs模拟数据
//
// Mock.mock('/api/public/login.do', 'post', () => {
//     return {
//         code: 1,
//         data:{
//             name:'1111',
//             age:23
//         }
//     }
// });
Mock.mock('/api/getMenu', 'post', () => {
    return {
        code: 1,
        data: [
            {
                name: '周报系统',
                icon: 'el-icon-date',
                path: '/views',
                component: 'views/index',
                children: [{
                    name: '首页',
                    icon: 'el-icon-menu',
                    path: '/index/dashboard',
                    component: 'views/dashboard',
                },{
                    name: '写周报',
                    icon: 'el-icon-edit',
                    path: '/views/addWeekly',
                    component: 'views/addWeekly',
                }, {
                    name: '周报列表',
                    icon: 'el-icon-document',
                    path: '/views/weeklyList',
                    component: 'views/weeklyList',
                }, {
                    name: '用户管理',
                    icon: 'el-icon-setting',
                    path: '/views/userList',
                    component: 'views/userList',
                }]
            }
        ]
    }
});
Mock.mock('/api/getMenu1', 'post', () => {
    return {
        code: 1,
        data: [
            {
                name: '周报系统',
                icon: 'el-icon-date',
                path: '/views',
                component: 'views/index',
                children: [{
                    name: '首页',
                    icon: 'el-icon-menu',
                    path: '/index/dashboard',
                    component: 'views/dashboard',
                },{
                    name: '写周报',
                    icon: 'el-icon-edit',
                    path: '/views/addWeekly',
                    component: 'views/addWeekly',
                }, {
                    name: '周报列表',
                    icon: 'el-icon-document',
                    path: '/views/weeklyList',
                    component: 'views/weeklyList',
                }]
            }
        ]
    }
});
