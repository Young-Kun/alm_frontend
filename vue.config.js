module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    filenameHashing: true,
    // devServer: {
    //     host: 'localhost',
    //     port: 8080,
    //     open: false,
    //     https: false,
    //     hotOnly: false,
    //     proxy: {
    //         // 配置跨域
    //         '/': {
    //             target: 'http://localhost:8000', // 前缀http://不能少
    //             ws: true, // 是否启用websockets
    //             changOrigin: true // 是否跨域
    //         }
    //     }
    // }
};
