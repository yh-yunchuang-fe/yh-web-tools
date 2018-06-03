/**
 * @author zhangyi
 * @date 2018/5/24
 */
const inquirer = require( 'inquirer');
const pkg = require('../package.json');
const fs = require('fs-extra');
const colors = require('colors');

const questions = [
    {
        type: 'list',
        name: 'framework',
        message: 'Which framework do you choose? [CTRL-C to Exit]',
        choices: ['React.js', 'Vue.js', 'jQuery.js'],
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

async function newPage() {
    const dirName = process.argv[3];
    if (!dirName) {
        console.log('You must enter pageName like'.cyan,'[new run new 180501_demo]'.yellow);
        return;
    }

    const sourceDir = pkg.dirs.sourceDir;
    const pageDir = `${sourceDir}/${dirName}`;

    const entries = fs.pathExistsSync(pageDir);

    if (entries) {
        console.log(`${pageDir} is exist!`.red);
    } else {
        const { framework } = await getFramework(); //TODO
        // const framework = 'react';

        fs.ensureDirSync(pageDir);
        fs.copySync(`_commons/tpl/${framework}`, `${pageDir}`);

        console.log("\n-------------".yellow);
        console.log('-- Done! Please start page as follow command:\n'.cyan);
        console.log(`npm run start ${dirName}`.blue);
        console.log("-------------\n".yellow);
    }
}


module.exports = newPage;
