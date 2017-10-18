const ip = require('../src/ip')

const assert = require('chai').assert

describe('ip', () => {
  const magicStr = '3345678'
  const mockIp = '127.0.0.1'
  const mockReq = {
    connection: {
      remoteAddress: mockIp
    }
  }

  describe('composeIpResponse', () => {
    it('should reflect input', () => {
      assert(ip.compose_ip_response(magicStr).ip === magicStr, 'contains ip address under key ip')
    })
  })

  describe('extractIp', () => {
    it('should return ip', () => {
      assert(ip.extract_ip(mockReq) === mockIp)
    })

  })

  describe('examineIp', () => {
    it('should pass ipv4', () => {
      assert(ip.examineIp('0.0.0.0'))
      assert(ip.examineIp('127.0.0.1'))
    })

    it('should deny numbers', () => {
      assert.isFalse(ip.examineIp(1))
      assert.isFalse(ip.examineIp(1 + 10 * 65536 * 256))
    })

    it('should reject non-ipv4 formats', () => {
      assert.isFalse(ip.examineIp('a'))
      assert.isFalse(ip.examineIp('hello world'))
      assert.isFalse(ip.examineIp('   '))
      assert.isFalse(ip.examineIp('1.1.1'))
      assert.isFalse(ip.examineIp('1.1.1.1.1'))
      assert.isFalse(ip.examineIp('1.3.5.a.7'))
      assert.isFalse(ip.examineIp('1.3..6'), 'consecutive dots')
    })

    it('should reject illegal ipv4 values', () => {
      assert.isFalse(ip.examineIp('1.3.5.a'))
      assert.isFalse(ip.examineIp('01.0.0.0'))
      assert.isFalse(ip.examineIp('256.0.0.0'))
      assert.isFalse(ip.examineIp('0.256.0.0'))
      assert.isFalse(ip.examineIp('0.0.312.0'))
      assert.isFalse(ip.examineIp('0.0.0.999'))
      assert.isFalse(ip.examineIp('0.0.0.8a7'))
      assert.isFalse(ip.examineIp('0.0.0.a01'))
      assert.isFalse(ip.examineIp('0.0.0.a10'))
      assert.isFalse(ip.examineIp('-2.1.1.1'))
    })
  })

  describe('get', () => {

    it('should return info from req', (done) => {
      let mockRes = {
        json: (msg) => {
          assert.deepEqual(msg, {ip: mockIp})
          done()
        }
      }

      ip.handler_get(mockReq, mockRes)
    })

  })
})
