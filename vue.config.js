// 修改配置后一定要 重新npm run serve !!!
module.exports = {
    devServer: {
        // vue项目启动时的ip地址和端口
        host: 'localhost',
        port: 8000,
        proxy: {
            // 匹配所有以 /api 开头的url
            '/api': {
                // 请求的目标主机
                target: 'http://120.25.214.246',
                changeOrigin: true,
                ws: true,
                // 这样重写会把路径中 /api 消去
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
}