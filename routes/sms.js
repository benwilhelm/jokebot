const express = require('express')
const router = new express.Router()
const db = require('../db')
const Joke = db.models.joke
const Sender = db.models.sender
const twilio = require('twilio')


router.post('/', (req, res, next) => {
  const message = req.body
  const phone = message.From
  const text = message.Body

  Promise.all([
    Joke.create({text}),
    Sender.findOrCreate({ where: {phone}}).then(([sender, created]) => sender)
  ])
  .then(([joke, sender]) => joke.setSender(sender))
  .then(() => {
    const MessageResponse = twilio.twiml.MessagingResponse;
    const twiml = new MessageResponse()
    twiml.message('Thanks!')
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  })
  .catch(next)
})


module.exports = router
