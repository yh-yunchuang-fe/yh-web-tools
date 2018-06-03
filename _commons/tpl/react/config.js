const pkg = require('../../package.json');
const port = pkg.port || 3000;

let env = ( process.env.NODE_ENV == 'development') ? "stage" : process.env.NODE_ENV;

function getURL() {
    switch (env) {
        case "stage":
            return "http://big-screen-rest-stage.yonghuivip.com/big-screen-rest/api";
        case "qa2":
            return "http://big-screen-rest-qa2.yonghuivip.com/big-screen-rest/api";
        case "qa3":
            return "http://big-screen-rest-qa3.yonghuivip.com/big-screen-rest/api";
        default:
            return "https://big-screen-rest.yonghuivip.com/big-screen-rest/api";
    }
}

let baseURL = (process.env.NODE_ENV != 'development') ? getURL() : `http://localhost:${port}/api`;


module.exports = {
    ENV: env,
    getURL: getURL,
    baseURL: baseURL
}
