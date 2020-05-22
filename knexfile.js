require('dotenv').config()

module.exports = {
  client: process.env.APP_DB_CONNECTION,
  connection: {
    host: process.env.APP_DB_HOST,
    port: process.env.APP_DB_PORT,
    database: process.env.APP_DB_NAME,
    user:     process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    ssl: false
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './src/database/migrations'
  }
};