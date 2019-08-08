// Update with your config settings.
module.exports = {
  development: {
    client: process.env.DB_CLIENT || 'mysql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'swapi',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations/',
    },
    seeds: {
      directory: __dirname + '/database/seeds/',
    }
  },


  production: {
    client: process.env.DB_CLIENT || 'mysql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'swapi',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations/',
    },
    seeds: {
      directory: __dirname + '/database/seeds/',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
