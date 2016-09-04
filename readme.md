# node-baidu-translate


[![npm](https://img.shields.io/npm/v/node-baidu-translate.svg)](https://www.npmjs.com/package/node-baidu-translate)
[![CircleCI](https://circleci.com/gh/djyde/node-baidu-translate.svg?style=shield&circle-token=37ed1fffe909906d96ac853adfc296f909bc319c)](https://circleci.com/gh/djyde/node-baidu-translate/tree/master)
[![npm](https://img.shields.io/npm/dt/node-baidu-translate.svg)](https://www.npmjs.com/package/node-baidu-translate)
[![npm](https://img.shields.io/npm/l/node-baidu-translate.svg)](https://www.npmjs.com/package/node-baidu-translate)


http://api.fanyi.baidu.com/api/trans/product/apidoc

## Quick Start

```javascript37ed1fffe909906d96ac853adfc296f909bc319c
import BaiduTranslate from 'node-baidu-translate'

const bdt = new BaiduTranslate(APPID, SECRET_KEY)

bdt.translate('apple', 'en').then(res => {
  console.log(res)
  // { from: 'en',
  //   to: 'zh',
  //   trans_result: [ { src: 'apple', dst: '苹果' } ] 
  // }
})
```

## API

#### constructor(appId: string, secretKey: string, endPoint?: string): baiduTranslateInstance

- appId
- secretKey
- endPoint

  API 请求 endpoint, 一般不需要填

#### baiduTranslateInstance.translate(query: string, to: string, from?: string = 'auto'): Promise

- query

  需要搜索的字符串

- to

  翻译成的语言

  语言列表：http://api.fanyi.baidu.com/api/trans/product/apidoc#languageList

- from

  源语言，不填会自动判断

  语言列表：http://api.fanyi.baidu.com/api/trans/product/apidoc#languageList

# License

MIT License
