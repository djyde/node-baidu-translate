const config = require('../_config')
const BaiduTranslate = require('../lib')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect
const assert = chai.assert

const EN = 'Apple'
const ZH = '苹果'

describe('Unit test', function () {

  const bdt = new BaiduTranslate(config.appId || process.env.BDT_APP_ID, config.secretKey || process.env.BDT_SECRET_KEY)

  it('should have correct appId and secretKey', function (done) {
    expect(bdt.appId).to.equal(config.appId)
    expect(bdt.secretKey).to.equal(config.secretKey)
    done()
  })

  it('should translate from en to zh', function () {
    return expect(bdt.translate(EN, 'zh', 'en')).to.eventually.eql({
      from: 'en',
      to: 'zh',
      trans_result: [
        {
          dst: ZH,
          src: EN
        }
      ]
    })
  })

  it('should translate from zh to en', function () {
    return expect(bdt.translate(ZH, 'en', 'zh')).to.eventually.eql({
      from: 'zh',
      to: 'en',
      trans_result: [
        {
          dst: EN,
          src: ZH
        }
      ]
    })
  })

  it('should throw error when pass an error params', function () {
    return assert.isRejected(bdt.translate(ZH, 'e', 'z'))
  })

  it('should translate a sentence', function () {
    return expect(bdt.translate('i am Randy', 'zh', 'en')).to.eventually.eql({
      from: 'en',
      to: 'zh',
      trans_result: [
        {
          dst: '我叫兰迪。',
          src: 'i am Randy'
        }
      ]
    })
  })
})
