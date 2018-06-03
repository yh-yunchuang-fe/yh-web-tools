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

const { VueLoaderPlugin } = require('vue-loader');

function getCommonConfig({ name, isCDN = 'no' }) {

    const htmlTemplate = `src/${name}/index.html`;
    const devMode = process.env.NODE_ENV === 'development';

    const contextPath = [path.join(__dirname, '../../src'), path.join(__dirname, '../../lib')];
    const nodeModules = path.join(__dirname, '../../node_modules');

    let cssLoader = [
        { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
        { loader: 'css-loader' },
        {
            loader: 'px2rem-loader',
            options: {
                remUnit: 75,
                remPrecision: 8
            }
        },
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
            path: path.join(__dirname, `../../dist/${name}`),
            publicPath: './',
            filename: `assets/js/${name}_[name].[hash:6].js`
        },

        externals: {
            jquery: 'jQuery'
        },

        resolve: {
            extensions: ['*', '.js', '.jsx'],
            alias: {
                'vue': 'vue/dist/vue.js'
            }
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
                    test: /\.vue$/,
                    // exclude: nodeModules,
                    loader: 'vue-loader',
                },
                {
                    test  : /\.(handlebars|hbs)$/,
                    loader: "handlebars-loader",
                    query : {
                        inlineRequires: '\/imgs\/'
                    }
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
                        name: `assets/img/[name].[hash:4].[ext]`
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: `assets/img/[name].[hash:4].[ext]`
                    }
                }
            ]
        },

        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: `assets/css/${name}_[name].[hash:4].css`,
                chunkFilename: `assets/css/${name}_[id].[hash:4].css`,
            }),
            new HtmlWebpackPlugin({
                filename: `index.html`,
                template: htmlTemplate
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }
            }),
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
