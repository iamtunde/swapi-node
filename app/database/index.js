const environment = process.env.APP_ENV || 'development'
const config = require('../../knexfile.js')[environment]
const database = require('knex')(config)

module.exports = database