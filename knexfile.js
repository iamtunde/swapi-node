const config = require('./app/config')
// Update with your config settings.
module.exports = {
  development: {
    client: config.db_client,
    connection: config.db_url,
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/app/database/migrations/',
    },
    seeds: {
      directory: __dirname + '/app/database/seeds/',
    },
  },

  production: {
    client: config.db_client_live,
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      database: config.db_name_live,
      user: config.db_user_live,
      password: config.db_password_live,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/app/database/migrations/',
    },
    seeds: {
      directory: __dirname + '/app/database/seeds/',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
