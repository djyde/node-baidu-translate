"use strict";
const utils_1 = require('./utils');
const request = require('superagent');
const END_POINT = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
module.exports = class BaiduTranslate {
    constructor(appId, secretKey, endPoint = END_POINT) {
        this.appId = appId;
        this.secretKey = secretKey;
        this.endPoint = END_POINT;
    }
    sign(query) {
        const salt = new Date().getTime().toString();
        const signedString = utils_1.sign(this.appId, this.secretKey, salt, query);
        return {
            salt: salt, signedString: signedString
        };
    }
    translate(query, to, from = 'auto') {
        const { salt, signedString } = this.sign(query);
        const queryString = { q: query, from: from, to: to, appid: this.appId, salt: salt, sign: signedString };
        return new Promise((resolve, reject) => {
            request
                .get(this.endPoint)
                .query(queryString)
                .end((err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (res.body.error_code) {
                        reject(res.body);
                    }
                    else {
                        resolve(res.body);
                    }
                }
            });
        });
    }
}
;
