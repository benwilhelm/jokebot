const express = require('express')
const app = express()
const PORT = 3000

const morgan = require('morgan')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/sms', require('./routes/sms'))

if (require.main === module) {
  app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Listening on port ${PORT}`)
  })
}

module.exports = app
