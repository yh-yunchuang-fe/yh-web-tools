/**
 * @author zhangyi
 * @date 2018/5/26
 */
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const getBaseConfig = require('./webpack.base.config');

function getDevConfig({ name, port }) {

    const webpackBaseConfig = getBaseConfig({ name });

    return webpackMerge(webpackBaseConfig, {

        mode: 'development',

        entry: [
            `webpack-dev-server/client?http://0.0.0.0:${port}`,
            'webpack/hot/dev-server',
            `./src/${name}/index.js`
        ],

        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}

module.exports = getDevConfig;
