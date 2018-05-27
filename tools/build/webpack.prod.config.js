/**
 * @author zhangyi
 * @date 2018/5/26
 */
const webpackMerge = require('webpack-merge');
const getBaseConfig = require('./webpack.base.config');

function getProdConfig({ name }) {

    const htmlTemplate = `src/${name}/index.html`;
    const webpackBaseConfig = getBaseConfig({ name });

    return webpackMerge(webpackBaseConfig, {

        mode: 'production',

        entry: [
            `./src/${name}/index.js`
        ]
    })
}

module.exports = getProdConfig;
