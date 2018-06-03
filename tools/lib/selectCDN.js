/**
 * @author zhangyi
 * @date 2018/6/3
 */
const inquirer = require('inquirer');

async function selectCDN() {

    return new Promise(resolve=> {
        inquirer.prompt({
            type: 'list',
            name: 'isCDN',
            message: 'Will you upload static files to CDN? [CTRL-C to Exit]',
            choices: ['no', 'yes']
        }).then(function (answer) {
            resolve(answer)
        })
    })
}


module.exports = selectCDN;
