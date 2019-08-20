const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    swapi_url: process.env.SWAPI_URL,
    port: process.env.APP_PORT || 3030,
    db_client: process.env.DATABASE_CLIENT,
    db_url: process.env.DATABASE_URL_LOCAL,

    db_client_live: process.env.DATABASE_CLIENT_LIVE,
    db_user_live: process.env.DATABASE_USER_LIVE,
    db_password_live: process.env.DATABASE_PASSWORD_LIVE,
    db_name_live: process.env.DATABASE_NAME_LIVE,
}