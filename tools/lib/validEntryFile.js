/**
 * @author zhangyi
 * @date 2018/5/24
 */
const globby = require( 'globby');
const pkg = require('../../package');

const defaultSourceDir = pkg.dirs.sourceDir;

// async function getEntry(dirName) {
//
//     const sourceDirs = await globby([dirName], {
//         cwd: defaultSourceDir
//     });
//     console.log('sourceDirs---:', sourceDirs);
//     if (!sourceDirs.length) {
//         console.log(`-- ${defaultSourceDir}/${dirName} is empty! --`);
//     }
//
//     return sourceDirs;
// }


module.exports = {
    getEntry
};

