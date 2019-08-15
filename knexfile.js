const { db_client, db_url } = require('./app/config')
// Update with your config settings.
module.exports = {
  development: {
    client: db_client,
    connection: db_url,
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/app/database/migrations/',
    },
    seeds: {
      directory: __dirname + '/app/database/seeds/',
    },
  },

  production: {
    client: db_client,
    connection: db_url,
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
