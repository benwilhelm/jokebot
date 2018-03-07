const pkg = require('../package.json')
const env = process.env.NODE_ENV || 'development'
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}-${env}`
const Sequelize = require('sequelize')

const db = new Sequelize(dbUrl, { logging: false})

module.exports = db
