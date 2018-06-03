/**
 * @author zhangyi
 * @date 2018/5/25
 */
const fs = require('fs-extra');
const colors = require('colors');
const pkg = require('../package.json');
const webpack = require('webpack');
const getProdConfig = require('./build/webpack.prod.config');
const selectEnv = require('./lib/selectEnv');

async function build(dirName, env, isCDN) {

    return new Promise(async (resolve, reject)=>{
        dirName = dirName || process.argv[3];

        if (!env) {
            env = await selectEnv();
        }

        process.env.NODE_ENV = env;

        if (!dirName) {
            console.error('-- source dir is empty! --');
            // return
            reject()
        }

        const sourceDir = pkg.dirs.sourceDir;
        const distDir = pkg.dirs.distDir;
        const pageDir = `${sourceDir}/${dirName}`;
        const entries = fs.pathExistsSync(pageDir);

        if (!entries) {
            console.log(`-- ${pageDir} is empty! --`.red);
            reject()
        } else {
            fs.removeSync(`${distDir}/${dirName}`);

            const webpackConfig = getProdConfig({name: dirName, isCDN});

            webpack(webpackConfig, (err, stats) => {
                if (err) {
                    console.log(err);
                    reject(err)
                }
                return resolve();
            });

        }
    });
}

module.exports = build;
