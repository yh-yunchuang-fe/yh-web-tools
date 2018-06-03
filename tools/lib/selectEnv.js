/**
 * @author zhangyi
 * @date 2018/6/3
 */
const inquirer = require('inquirer');

async function selectEnv(){

    return new Promise(resolve => {
        inquirer.prompt({
            type: 'list',
            name: 'env',
            message: 'Which env do you choose? [CTRL-C to Exit]',
            choices: ['stage', 'qa2', 'qa3', 'production']
        }).then(function (answer){
            resolve(answer);
        })
    });
}

module.exports = selectEnv;
