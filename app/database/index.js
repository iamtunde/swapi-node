const environment = process.env.APP_ENV || 'production'
const config = require('../../knexfile.js')[environment]
const database = require('knex')(config)

module.exports = database