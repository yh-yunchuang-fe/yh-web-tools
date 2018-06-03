/**
 * @author zhangyi
 * @date 2018/6/3
 */
const selectPage = require('./lib/selectPage');
const selectEnv = require('./lib/selectEnv');
const selectCDN = require('./lib/selectCDN');

const run = require('./run');
const build = require('./build');
const uploadCDN = require('./uploadCDN');

async function deploys() {
    const { env } = await selectEnv();
    const { pages } = await selectPage();

    console.log('env:', env);
    console.log('pages:', pages);

    let isCDN = false;
    if (env === 'production') {
        const CNDObj = await selectCDN();
        isCDN = CNDObj.isCDN;
    }
    console.log('isCND:', isCDN);

    if (!pages || !pages.length) {
        return console.log('You didn\'t choose any page!'.yellow);
    }

    try {
        await Promise.all(pages.map(async (page) => {
            console.log('11111');
            await run(build.bind(null, page, env, isCDN));
            console.log('222222');
            if (isCDN === 'yes') {
                await run(uploadCDN.bind(null, page));
            }
        }))

    } catch(e) {
        console.log('-- deploy error --');
        console.log(e);
    }
}

module.exports = deploys;
