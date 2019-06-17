// knex db connection settings
require('dotenv').config()

module.exports = {

  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_NAME,
    user: process.env.USER,
    password: process.env.PASS
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};