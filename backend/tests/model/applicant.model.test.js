const applicantModel = require('../../src/model/applicant.model');
const { sequelize } = require('../../models');
/* eslint-disable no-undef */
describe('Applicant Model', () => {
  afterAll(async () => {
    sequelize.close();
  });
  it('Get All Applicants', async () => {
    const response = await applicantModel.getAllApplicants();
    expect(response.length).toBeGreaterThanOrEqual(2);
    expect(response[response.length - 2]).toHaveProperty('nome', 'Fulano Beltrano de Oliveira da Silva');
    expect(response[response.length - 2]).toHaveProperty('email', '__fulanobos@gmail.com');
    expect(response[response.length - 2]).toHaveProperty('telefone', '31996661111');
    expect(response[response.length - 2]).toHaveProperty('nascimento');
  });

  it('Get Applicants', async () => {
    const promiseList = [
      applicantModel.getApplicants(300),
      applicantModel.getApplicants(2),
      applicantModel.getApplicants(1),
      applicantModel.getApplicants(0),
    ];

    const responses = await Promise.all(promiseList);

    expect(responses[0].length).toBeLessThan(300);
    expect(responses[1]).toHaveLength(2);
    expect(responses[2]).toHaveLength(1);
    expect(responses[3]).toHaveLength(0);
  });

  it('Upsert Applicants', async () => {
    const response = await applicantModel.upsertApplicant({
      nome: 'Teste 1', email: 'Teste1@gmail.com', telefone: '1111-1111', nascimento: new Date(1990, 25, 10),
    });
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('applicant');
    expect(response.applicant).toHaveProperty('dataValues');
    expect(response.applicant.dataValues).toHaveProperty('nome', 'Teste 1');
    expect(response.applicant.dataValues).toHaveProperty('email', 'Teste1@gmail.com');
    expect(response.applicant.dataValues).toHaveProperty('telefone', '1111-1111');
    expect(response.applicant.dataValues).toHaveProperty('nascimento');
  });
});
