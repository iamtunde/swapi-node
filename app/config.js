const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    swapi_url: process.env.SWAPI_URL,
    port: process.env.APP_PORT || 3030,
    // db_client: process.env.DATABASE_CLIENT,
    // db_url: process.env.DATABASE_URL_LOCAL,
    
    db_client: process.env.DATABASE_CLIENT,
    db_user_local: process.env.DATABASE_USER_LOCAL,
    db_password_local: process.env.DATABASE_PASSWORD_LOCAL,
    db_name_local: process.env.DATABASE_NAME_LOCAL,

    db_client: process.env.DATABASE_CLIENT,
    db_user_live: process.env.DATABASE_USER_LIVE,
    db_password_live: process.env.DATABASE_PASSWORD_LIVE,
    db_name_live: process.env.DATABASE_NAME_LIVE,
}