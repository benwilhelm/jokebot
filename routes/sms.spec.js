const app = require('../index')
const request = require('supertest')
const db = require('../db')
const { expect } = require('chai')

describe('sms router', () => {
  before(() => db.sync({ force: true }))

  describe('POST /sms', () => {

    describe('payload: joke with new sender', function() {
      before(async () => {
        this.res = await request(app)
                         .post('/sms')
                         .send({
                           To: '+13125551111',
                           From: '+13125550000',
                           Body: 'Test message'
                         })
                         .expect(200)
      })

      it('should create new joke and sender', async () => {
        const jokes   = await db.models.joke.findAll()
        const senders = await db.models.sender.findAll()
        expect(jokes.length).to.equal(1)
        expect(senders.length).to.equal(1)

        const joke = jokes[0]
        const sender = senders[0]
        expect(joke.text).to.equal('Test message')
        expect(joke.senderId).to.be.above(0)
        expect(joke.senderId).to.equal(sender.id)
        expect(sender.phone).to.equal('+13125550000')
      })

      it('should respond with TWIML thank you', async () => {
        expect(this.res.header['content-type']).to.equal('text/xml')
        expect(this.res.text).to.match(/Thanks!/)
      })
    })

    describe('payload: joke with existing sender', function() {
      before(async () => {
        this.res = await request(app)
                         .post('/sms')
                         .send({
                           To: '+13125551111',
                           From: '+13125550000',
                           Body: 'Another message'
                         })
                         .expect(200)
      })

      it('should associate joke with existing sender', async() => {
        const jokes   = await db.models.joke.findAll()
        const senders = await db.models.sender.findAll()
        expect(jokes.length).to.equal(2)
        expect(senders.length).to.equal(1)

        const joke = jokes[1]
        const sender = senders[0]
        expect(joke.text).to.equal('Another message')
        expect(joke.senderId).to.be.above(0)
        expect(joke.senderId).to.equal(sender.id)
        expect(sender.phone).to.equal('+13125550000')
      })
    })
  })
})
