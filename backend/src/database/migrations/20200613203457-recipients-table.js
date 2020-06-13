'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('recipients', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: true, 
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        street: {
          type: Sequelize.STRING,
          allowNull: true
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: true
        }, 
        complement: {
          type: Sequelize.STRING,
          allowNull: true
        },
        state: {
          type: Sequelize.STRING,
          allowNull: true
        },
        city: {
          type: Sequelize.STRING,
          allowNull: true
        },
        zip_code: {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('recipients');
  }
};
