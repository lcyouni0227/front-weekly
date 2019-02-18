
module.exports = {
    runtimeCompiler: true, //关键点在这
    devServer: {
        // proxy: 'http://localhost:3000'
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        proxy:{
            '/api':{
                target:'http://127.0.0.1:8081',
                hot: true,
                ws:false,
                changeOrigin: true,
                // disableHostCheck: true,
                pathRewrite: {
                    '^/api': '/'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        }
    }
};
