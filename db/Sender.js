const db = require('./_db')
const Sequelize = require('sequelize')

const Sender = db.define('sender', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Sender
