/**
 * @author zhangyi
 * @date 2018/5/25
 */
const fs = require('fs-extra');
const colors = require('colors');
const pkg = require('../package.json');
const webpack = require('webpack');
const getProdConfig = require('./build/webpack.prod.config');

async function build(dirName) {
    dirName = dirName || process.argv[3];

    if (!dirName) {
        console.error('-- source dir is empty! --');
        return
    }
    process.env.NODE_ENV = 'production';

    const sourceDir = pkg.dirs.sourceDir;
    const distDir = pkg.dirs.distDir;
    const pageDir = `${sourceDir}/${dirName}`;
    const entries = fs.pathExistsSync(pageDir);

    if (!entries) {
        console.log(`-- ${pageDir} is empty! --`.red);
    } else {
        fs.removeSync(`${distDir}/${dirName}`);

        const webpackConfig = getProdConfig({name: dirName});

        webpack(webpackConfig, (err, stats) => {
            if (err) {
                console.log(err);
            }
        })
    }

}

module.exports = build;
