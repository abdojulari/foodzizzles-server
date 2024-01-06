'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      // check if database exists
      const dbName = sequelize.config.database;
      const db = await queryInterface.sequelize.query(
        `SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${dbName}');`
      );
      if (db[0].length === 0) {
        await queryInterface.sequelize.query(`CREATE DATABASE ${dbName};`);
      } 
  },

  async down (queryInterface, Sequelize) {
   
  }
};
