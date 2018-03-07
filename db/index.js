const db = require('./_db')
const Joke = require('./Joke')
const Sender = require('./Sender')

Joke.belongsTo(Sender, { as: 'sender' })
Sender.hasMany(Joke, { as: 'jokes' })

module.exports = db
