const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    swapi_url: process.env.SWAPI_URL,
    port: process.env.APP_PORT,
    db_client: process.env.DATABASE_CLIENT,
    db_url: process.env.DATABASE_URL_LOCAL,
}