"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const request = require("superagent");
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
            salt, signedString
        };
    }
    translate(query, to, from = 'auto', times = 30000) {
        const { salt, signedString } = this.sign(query);
        const queryString = { q: query, from, to, appid: this.appId, salt, sign: signedString };
        return new Promise((resolve, reject) => {
            request
                .post(this.endPoint)
                .timeout(times)
                .send(queryString)
                .set('Content-Type', 'application/x-www-form-urlencoded')
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
};
