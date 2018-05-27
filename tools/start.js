/**
 * @author zhangyi
 * @date 2018/5/25
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
// const getBaseConfig = require('./build/webpack.base.config');
const getDevConfig = require('./build/webpack.dev.config');
const pkg = require('../package.json');

const port = pkg.port || 3000;

async function server(dirName) {
    dirName = dirName || process.argv[3];
    if (!dirName) {
        console.log('You must enter pageName'.cyan);
        return;
    }

    process.env.NODE_ENV = 'development';
    const webpackConfig = getDevConfig({ name: dirName, port });
    let complier = webpack(webpackConfig);

    const server = new webpackDevServer(complier, {
        contentBase: '../dist',
        hot: true,
        host: 'localhost',
        stats: { colors: true }

    }).listen(port, '0.0.0.0', function (err) {
        console.log('err----:', err);

        console.log("\n-------------\n");
        console.log(`http://localhost:${port}/${dirName}/index.html`);
    })
}

module.exports = server;

