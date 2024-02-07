'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return await queryInterface.bulkInsert('users', [{
            name: 'Jane Austen',
            email: 'jane.austen@example',
            password: 'iamunavailable',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface) {
        return await queryInterface.bulkDelete('users', null, {});
    }
};
