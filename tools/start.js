/**
 * @author zhangyi
 * @date 2018/5/25
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
// const getBaseConfig = require('./build/webpack.base.config');
const getDevConfig = require('./build/webpack.dev.config');
const pkg = require('../package.json');
const path = require('path');

const port = pkg.port || 3000;

async function server(dirName) {
    dirName = dirName || process.argv[3];
    if (!dirName) {
        console.log('You must enter pageName'.cyan);
        return;
    }

    // process.env.NODE_ENV = 'development';
    const webpackConfig = getDevConfig({ name: dirName, port });
    // 获取项目中配置文件
    const projectConfig = require(path.join(__dirname, '../src/', dirName, '/config'));
    console.log(projectConfig.ENV);
    // 记录启动的项目
    process.project = dirName;
    let complier = webpack(webpackConfig);

    const server = new webpackDevServer(complier, {
        host: 'localhost',
        stats: { colors: true },
        // contentBase: '../dist',
        hot: true,
        proxy: {
            "/api": {
                target: projectConfig.getURL(),
                pathRewrite: {
                    "^/api": ""
                },
                changeOrigin: true,
                secure: false,
            }
        }

    }).listen(port, '0.0.0.0', function(err) {
        console.log('err----:', err);

        console.log("\n-------------\n");
        console.log(`http://localhost:${port}/index.html`);
    })
}

module.exports = server;
