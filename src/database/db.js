const { Sequelize } = require('sequelize');
const config = require("../../config/config.json")

const connection = { timezone: '+05:30', ...config.development }
const sequelize = new Sequelize(connection);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
