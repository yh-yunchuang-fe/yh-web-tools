/**
 * @author zhangyi
 * @date 2018/5/25
 */
function format(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn, options) {
    const task = typeof fn === 'undefined' ? fn : fn;
    const start = new Date();
    console.log(
        `[${format(start)}] Starting '${task.name}${options ? `(${options})` : ''}'...`
    );
    return task(options).then((result) => {
        const end = new Date();
        const time = end.getTime() - start.getTime();
        console.log(
            `[${format(end)}] Finished '${task.name}${options ? `(${options})` : ''}' after ${time} ms`
        );
        return result;
    });
}

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
    delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle
    const module = require(`./${process.argv[2]}.js`);
    run(module).catch(err => console.error(err.stack));
}

module.exports = run;

