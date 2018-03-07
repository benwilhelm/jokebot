const db = require('./_db')
const Sequelize = require('sequelize')

const Joke = db.define('joke', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Joke
