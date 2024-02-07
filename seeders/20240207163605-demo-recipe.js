'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
      await queryInterface.bulkInsert('recipes', [{
          name: 'Nigerian Jollof Rice',
          description: 'The best recipes on Nigerian Jollof Rice',
          duration: 30,
          category: 'West Africa',
          cuisine: 'West African Cuisine',
          date: '2015-12-03',
          image: 'uploads/recipes/test-12345.jpg',
          createdAt: new Date(),
          updatedAt: new Date()
      }], {});
 
  },

  async down (queryInterface) {
    return await queryInterface.bulkDelete('recipes', null, {});
  }
};
