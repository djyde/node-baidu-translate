import { sign } from './utils'
import * as request from 'superagent'

type transResult = {
  from: string,
  to: string,
  trans_result: Object,
  src: string,
  dst: string
}

type queryString =  {
  q: string,
  from: string,
  to: string,
  appid: string,
  salt: string,
  sign: string
}

const END_POINT = 'http://api.fanyi.baidu.com/api/trans/vip/translate'

module.exports = class BaiduTranslate {
  private appId: string
  private secretKey: string
  private endPoint: string

  constructor (appId: string, secretKey: string, endPoint: string = END_POINT) {
    this.appId = appId
    this.secretKey = secretKey
    this.endPoint = END_POINT
  }

  private sign (query): { salt: string, signedString: string } {
    const salt: string = new Date().getTime().toString()
    const signedString = sign(this.appId, this.secretKey, salt, query)
    return {
      salt, signedString
    }
  }

  public translate (query: string, to: string, from: string = 'auto', times: number = 30000): Promise<transResult> {
    const { salt, signedString } = this.sign(query)
    const queryString: queryString = { q: query, from, to, appid: this.appId, salt, sign: signedString }
    return new Promise<transResult>((resolve, reject) => {
      request
        .post(this.endPoint)
        .timeout(times)
        .send(queryString)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            if (res.body.error_code) {
              reject(res.body)
            } else {
              resolve(res.body)
            }
          }
        })
    })
  }
}
