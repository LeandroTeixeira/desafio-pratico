module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [
      {
        email: 'leandroteixeira@in8.com.br',
        password: '12345',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        email: 'andremoreira@in8.com.br',
        password: '12345',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        email: '@in8.com.br',
        password: 'root',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

    ], {});
  },

  async down(queryInterface) {
    queryInterface.bulkDelete('Admins', null, {});
  },
};
