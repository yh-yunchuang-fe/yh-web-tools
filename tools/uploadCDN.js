/**
 * @author zhangyi
 * @date 2018/6/3
 */
const path = require('path');
const fs = require('fs-extra');
const qiniu = require('qiniu');
const CDNConfig = require('../CDNConfig');

const prefix = 'yh-tv-project';

const mac = new qiniu.auth.digest.Mac(CDNConfig.AccessKey, CDNConfig.SecretKey);
//创建并修改配置对象
let config = new qiniu.conf.Config();
// 空间对应的机房 (Zone_z0=华东 Zone_z1=华北 Zone_z2=华南 Zone_na0=北美)
config.zone = qiniu.zone.Zone_z0;


function uploadFile(path, fileName, staticPath) {
    try {
        let localFile = `${path}/${fileName}`;
        console.log('localFile:', localFile);

        // let key = 'yh-tv-project/react_demo/assets/img/alone.ed2e.jpg';
        let key = `${prefix}/${staticPath}/${fileName}`;
        console.log('key-----:', key);

        let options = {
            scope: CDNConfig.Bucket + ":" + key
        };

        let putPolicy = new qiniu.rs.PutPolicy(options);
        console.log('putPolicy:', putPolicy);

        let uploadToken = putPolicy.uploadToken(mac);
        let formUploader = new qiniu.form_up.FormUploader(config);
        let putExtra = new qiniu.form_up.PutExtra();

        // 文件上传
        formUploader.putFile(
            uploadToken,
            key,
            localFile,
            putExtra,
            function(respErr, respBody, respInfo) {
                if (respErr) {
                    throw respErr;
                }
                if (respInfo.statusCode == 200) {
                    console.log(respBody);
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                }
            });
    } catch(e) {
        console.log('-----uploadFile error------');
        console.log(e)
    }
}

function uploadDirectory(dirName, typePath) {
    let sourceDir = path.resolve(`dist/${dirName}`, typePath);
    const entries = fs.pathExistsSync(sourceDir);
    console.log('sourceDir:', sourceDir);
    console.log('entries:', entries);
    if (!entries) {
        console.log(`Dir is empty!`.red);
        return
    }

    try {

        const files = fs.readdirSync(sourceDir);

        console.log('files:', files);
        const staticPath = `${dirName}/${typePath}`;
        files.forEach(file => {
            uploadFile(sourceDir, file, staticPath)
        })

    } catch (e){
        console.log('-----uploadDirectory error------');
        console.log(e)
    }
}

async function uploadCDN(dirName){
    dirName = dirName || process.argv[3];

    const types = [
        {
            path: "assets/img"
        }, {
            path: "assets/js"
        }, {
            path: "assets/css"
        }
    ];

    for (let type of types) {
        await uploadDirectory(dirName, type.path);
    }
}

module.exports = uploadCDN;
