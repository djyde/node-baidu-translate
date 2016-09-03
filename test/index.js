const config = require('../_config')
const BaiduTranslate = require('../lib')
const expect = require('chai').expect

const QUERY = 'apple'
const EXPECT = '苹果'
const TO = 'zh'

describe('Unit test', function () {

  const bdt = new BaiduTranslate(config.appId, config.secretKey)

  it('should have correct appId and secretKey', function (done) {
    expect(bdt.appId).to.equal(config.appId)
    expect(bdt.secretKey).to.equal(config.secretKey)
    done()
  })

  it('should return correct translate result', function (done) {
    bdt.translate(QUERY, TO).then(res => {
      expect(res.from).to.equal('en')
      expect(res.to).to.equal(TO)
      expect(res.trans_result[0].src).to.equal(QUERY)
      expect(res.trans_result[0].dst).to.equal(EXPECT)
      done()
    })
  })
})
