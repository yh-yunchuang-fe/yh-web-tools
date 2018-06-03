/**
 * @author zhangyi
 * @date 2018/6/3
 */
const inquirer = require('inquirer');
const fs = require('fs-extra');

function getPages(){
    return fs.readdirSync('src');
}

async function selectPage() {
    let pages = getPages();

    return new Promise(resolve => {
        inquirer.prompt({
            type: 'checkbox',
            name: 'pages',
            message  : 'What\'s pages will you deploy? [CTRL-C to Exit]',
            choices: pages
        }).then(function (answer){
            resolve(answer);
        })
    });
}


module.exports = selectPage;
