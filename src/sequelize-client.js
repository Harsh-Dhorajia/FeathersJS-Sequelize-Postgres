const Sequelize = require('sequelize');
const { POSTGRES } = require('./constants');

const sequelizeClient = new Sequelize({
  host: POSTGRES.HOST,
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DB,
  dialect: POSTGRES.DIALECT,
  port: POSTGRES.PORT,
  logging: false,
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelizeClient;
