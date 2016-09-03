# node-baidu-translate

```javascript
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
