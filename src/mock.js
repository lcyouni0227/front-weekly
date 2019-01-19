//引入mockjs
import Mock from 'mockjs';
//使用mockjs模拟数据

var loginData = function () {
    var mockData = [];
    mockData = {
        "code": "1",
        "message": "登录成功",
        "data": [
            {
                user: "工作台",
                password: "0"
            },]
    }
    return mockData
}
Mock.mock('/user/loginData', 'get', loginData);
Mock.mock('/api/menu', 'get', () => {
    return {
        code:1,
        data: [{
            "name": "项目管理",
            "name_en": "Projects",
            "router": "/",
            "icon": "el-icon-time",
            "children": [{
                "name": "关于我",
                "name_en": "About",
                "router": "/index/about",
                "icon": "el-icon-document"
            }]
        }, {
            "name": "部门管理",
            "name_en": "BM",
            "router": "/index/BM",
            "icon": "el-icon-picture-outline",
            "children": []
        },{
            "name": "权限",
            "name_en": "Authority",
            "router": "/index/Authority",
            "icon": "el-icon-setting",
            "children": []
        },{
            "name": "视图设计",
            "name_en": "ViewDesign",
            "router": "/index/ViewDesign",
            "icon": "el-icon-setting",
            "children": []
        }]

    }
})
