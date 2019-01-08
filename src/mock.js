//引入mockjs
import Mock from 'mockjs';
//使用mockjs模拟数据
Mock.mock('/api/data', 'get', (req, res) => {
    return {
        status: "1",
        data: ['a', 'b']
    }
});
var loginData = function () {
    var mockData = [];
    mockData = {
        "status": "1",
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
        code:'1',
        data: [{
            "name": "项目管理",
            "name_en": "Projects",
            "router": "/",
            "icon": "el-icon-time",
            "children": [{
                "name": "关于我",
                "name_en": "About",
                "router": "/about",
                "icon": "el-icon-document"
            }]
        }, {
            "name": "部门管理",
            "name_en": "Bm",
            "router": "/Bm",
            "icon": "el-icon-picture-outline",
            "children": []
        },{
            "name": "权限",
            "name_en": "Authority",
            "router": "/authority",
            "icon": "el-icon-setting",
            "children": []
        }]

    }
})
