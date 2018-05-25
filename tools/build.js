/**
 * @author zhangyi
 * @date 2018/5/25
 */
const fs = require('fs-extra');
const colors = require('colors');
const pkg = require('../package.json');

const webpack = require('webpack');
const getConfig = require('./build/webpack.config');

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

        const webpackConfig = getConfig({name: dirName});

        webpack(webpackConfig, (err, stats) => {
            // console.log('stats:', stats);
            if (err) {
                console.log(err);
            }
        })
    }

}

module.exports = build;
