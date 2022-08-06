require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    query: {
      raw: true,
    },
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    query: {
      raw: true,
    },
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    query: {
      raw: true,
    },
  },
};
