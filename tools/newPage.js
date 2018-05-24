/**
 * @author zhangyi
 * @date 2018/5/24
 */
import { getEntry } from "./lib/validEntryFile";
import inquirer from 'inquirer'
const pkg = require('../package.json');
const fse = require('fs-extra');
const colors = require('colors');

const questions = [
    {
        type: 'list',
        name: 'framework',
        message: 'Which framework do you choose? [CTRL-C to Exit]',
        choices: ['jQuery.js', 'React.js', 'Vue.js'],
        filter: function (val) {
            return val.toLowerCase().split('.')[0];
        }
    }
];

function getFramework() {
    return new Promise(resolve => {
        inquirer.prompt(questions).then(function (answers) {
            console.log('answers:', answers);
            return resolve({...answers})
        })
    })
}

export default async function newPage() {
    const dirName = process.argv[3];
    if (!dirName) {
        console.log('You must enter pageName like'.cyan,'[new run new 180501_demo]'.yellow)
        return;
    }

    const sourceDir = pkg.dirs.sourceDir;
    const entries = await getEntry(dirName);

    if (entries.length) {
        console.log(`${sourceDir}/${dirName} is exist!`);
    } else {
        const { framework } = await getFramework();
        const pageDir = `${sourceDir}/${dirName}`;

    }
}
