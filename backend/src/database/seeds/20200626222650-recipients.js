'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('recipients', [{
      name: 'Felipe Recebedor',
      street: 'R. Geraldo Higino de Carvalho',
      number: 206,
      state: 'SP',
      city: 'Guarulhos',
      zip_code: '07134615',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
