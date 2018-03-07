const sid = process.env.TWILIO_ACCOUNT_SID
const token = process.env.TWILIO_AUTH_TOKEN

const Twilio = require('twilio')
const client = new Twilio(sid, token)

module.exports = client
