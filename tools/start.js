/**
 * @author zhangyi
 * @date 2018/5/25
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const getConfig = require('./build/webpack.config');

const port = 3000;
async function server(dirName) {
    dirName = dirName || process.argv[3];
    if (!dirName) {
        console.log('You must enter pageName'.cyan);
        return;
    }
    process.env.NODE_ENV = 'development';

    const webpackConfig = getConfig({ name: dirName });

    let complier = webpack(webpackConfig);

    const server = new webpackDevServer(complier, {
        contentBase: '../dist',
        hot: true,
        host: 'localhost',
        stats: { colors: true }
    }).listen(port, '0.0.0.0', function (err) {
        console.log("\n-------------\n");
        console.log(`http://localhost:${port}/${dirName}/index.html`);
    })
}

module.exports = server;

