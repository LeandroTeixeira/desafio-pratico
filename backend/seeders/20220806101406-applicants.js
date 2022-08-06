require('dotenv').config();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Applicants', [{
      nome: 'Fulano Beltrano de Oliveira da Silva',
      email: '__fulanobos@gmail.com',
      nascimento: new Date(1995, 10, 13),
      telefone: '31996661111',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }], {});

    if (process.env.NODE_ENV.match(/test/)) {
      await queryInterface.bulkInsert('Applicants', [{
        nome: 'Leandro Teixeira',
        email: 'leandroteixeira3@gmail.com',
        nascimento: new Date(1997, 12, 21),
        telefone: '31996661111',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      }], {});
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Applicants', null, {});
  },
};
