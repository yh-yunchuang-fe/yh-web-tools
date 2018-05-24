/**
 * @author zhangyi
 * @date 2018/5/24
 */
import path from 'path';
// const globby = require('globby');
import globby from 'globby';
import fs from 'fs'
const pkg = require('../../package');

const defaultSourceDir = pkg.dirs.sourceDir;

export async function getEntry(dirName) {
    const sourceDirs = await globby([dirName], {
        cwd: defaultSourceDir
    });
    if (!sourceDirs.length) {
        console.log(`-- ${defaultSourceDir}/${dirName} is empty! --`);
    }

    return sourceDirs;
}


