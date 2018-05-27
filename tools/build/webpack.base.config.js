/**
 * @author zhangyi
 * @date 2018/5/25
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


function getCommonConfig({ name }) {

    const htmlTemplate = `src/${name}/index.html`;
    const devMode = process.env.NODE_ENV !== 'production';

    const contextPath = path.join(__dirname, '../../src');
    const nodeModules = path.join(__dirname, '../../node_modules');

    let cssLoader = [
        { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
        { loader: 'css-loader' },
        {
            loader: 'postcss-loader',
            options: {
                config: {
                    path: path.join(__dirname, '../build/postcss.config.js')
                }
            }
        }
    ];

    const lessLoader = cssLoader.concat({ loader: 'less-loader'});

    return {
        output: {
            path: path.join(__dirname, "../../dist"),
            publicPath: '/',
            filename: `${name}/js/${name}_[name].[hash:6].js`
        },

        resolve: {
            extensions: ['*', '.js', '.jsx']
        },

        devtool: "#source-map",

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: contextPath,
                    exclude: nodeModules,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    exclude: nodeModules,
                    use: cssLoader
                },
                {
                    test: /\.less$/,
                    exclude: nodeModules,
                    use: lessLoader
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: `${name}/img/[name].[hash:4].[ext]`
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: `${name}/fonts/[name].[hash:4].[ext]`
                    }
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: `${name}/css/${name}_[name].[hash:4].css`,
                chunkFilename: `${name}/css/${name}_[id].[hash:4].css`,
            }),
            new HtmlWebpackPlugin({
                filename: `${name}/index.html`,
                template: htmlTemplate
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ],

        optimization: {
            minimizer: devMode ? [] : [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin()
            ]
        },
    }
}

module.exports = getCommonConfig;
