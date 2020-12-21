const Sequelize = require('sequelize');

const sequelize = new Sequelize('dbBoxOne', 'rpi32bit', 'Ash1t4k4@', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sequelize;