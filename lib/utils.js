"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5 = require("md5");
function sign(appId, secretKey, salt, query) {
    const str1 = appId + query + salt + secretKey;
    return md5(str1);
}
exports.sign = sign;
