const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.SQL_DATABASE,
  process.env.SQL_UID,
  process.env.SQL_PWD,
  {
    host: process.env.SQL_SERVER,
    dialect: 'mssql',
    native: true,
    ssl: true,
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
