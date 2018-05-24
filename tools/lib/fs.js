/**
 * @author zhangyi
 * @date 2018/5/24
 */
import fs from 'fs';
import mkdirp from 'mkdirp';

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

export default {writeFile, makeDir, readFile, readJsonSync};
