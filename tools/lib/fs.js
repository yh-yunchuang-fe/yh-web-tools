/**
 * @author zhangyi
 * @date 2018/5/24
 */
const fs = require( 'fs');
const mkdirp = require( 'mkdirp');

const writeFile = (file, contents) => new Promise((resolve, reject) => {
    fs.writeFile(file, contents, 'utf8', err => err ? reject(err) : resolve());
});

const readFile = (file) => new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', err => err ? reject(err) : resolve());
});

const makeDir = (name) => new Promise((resolve, reject) => {
    mkdirp(name, err => err ? reject(err) : resolve());
});

const readJsonSync = file => {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
};

module.exports = { writeFile, makeDir, readFile, readJsonSync };
