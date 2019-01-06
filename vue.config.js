let path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    devServer: {
        // proxy: 'http://localhost:3000'
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
    }
}
