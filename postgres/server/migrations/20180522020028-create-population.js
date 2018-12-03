'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Populations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      countryName: {
        type: Sequelize.STRING
      },
      countryCode: {
        type: Sequelize.STRING
      },
      in1960: {
        type: Sequelize.BIGINT
      },
      in1970: {
        type: Sequelize.BIGINT
      },
      in1980: {
        type: Sequelize.BIGINT
      },
      in1990: {
        type: Sequelize.BIGINT
      },
      in2000: {
        type: Sequelize.BIGINT
      },
      in2010: {
        type: Sequelize.BIGINT
      },
      in2016: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Populations');
  }
};