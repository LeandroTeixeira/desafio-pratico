/* eslint-disable no-undef */
const request = require('supertest');
const sinon = require('sinon');
const applicantModel = require('../../src/model/applicant.model');
const app = require('../../src/app');

describe('Applicant Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Applicant Controller : Get Applicants', async () => {
    sinon.stub(applicantModel, 'getAllApplicants').resolves(
      [{
        nome: 'Fulano Beltrano de Oliveira da Silva',
        email: '__fulanobos@gmail.com',
        nascimento: (new Date(1995, 10, 13)).toString(),
        telefone: '31996661111',
      }, {
        nome: 'Leandro Teixeira',
        email: 'leandroteixeira3@gmail.com',
        nascimento: (new Date(1995, 10, 13)).toString(),
        telefone: '31996661111',
      }],
    );
    const applicantList = await request(app)
      .get('/applicant')
      .send({})
      .expect(200);

    expect(applicantList.body).toHaveLength(2);
    expect(applicantList.body[0]).toEqual({
      nome: 'Fulano Beltrano de Oliveira da Silva',
      email: '__fulanobos@gmail.com',
      nascimento: (new Date(1995, 10, 13)).toString(),
      telefone: '31996661111',
    });

    expect(applicantList.body[1]).toEqual({
      nome: 'Leandro Teixeira',
      email: 'leandroteixeira3@gmail.com',
      nascimento: (new Date(1995, 10, 13)).toString(),
      telefone: '31996661111',
    });
  });

  it('Applicants Controller : Post applicant fail cases', async () => {
    sinon.stub(applicantModel, 'upsertApplicant').throws(new Error('Error: 404'));

    await request(app)
      .post('/applicant')
      .send({})
      .expect(400)
      .expect({ message: 'Error: "Nome" is a required field.' });

    await request(app)
      .post('/applicant')
      .send({ nome: 'Leandro Teixeira' })
      .expect(400)
      .expect({ message: 'Error: "email" is a required field.' });

    await request(app)
      .post('/applicant')
      .send({ nome: 'Leandro Teixeira', email: 'leo@gmail.com' })
      .expect(400)
      .expect({ message: 'Error: "nascimento" is a required field.' });

    await request(app)
      .post('/applicant')
      .send({ nome: 'Leandro Teixeira', email: 'leo@gmail.com', nascimento: new Date(1995, 10, 13) })
      .expect(400)
      .expect({ message: 'Error: "telefone" is a required field.' });

    await request(app)
      .post('/applicant')
      .send({
        nome: 123, email: 'leo@gmail.com', nascimento: new Date(1995, 10, 13), telefone: 31999991234,
      })
      .expect(422)
      .expect({ message: 'Error: "Nome" must be string.' });

    await request(app)
      .post('/applicant')
      .send({
        nome: 'Leandro Teixeira', email: 123, nascimento: new Date(1995, 10, 13), telefone: 31999991234,
      })
      .expect(422)
      .expect({ message: 'Error: "Email" must be string.' });

    await request(app)
      .post('/applicant')
      .send({
        nome: 'Leandro Teixeira', email: 'leo', nascimento: new Date(1995, 10, 13), telefone: 31999991234,
      })
      .expect(422)
      .expect({ message: 'Error: Wrong email format.' });

    await request(app)
      .post('/applicant')
      .send({
        nome: 'Leandro Teixeira', email: 'leo@gmail.com', nascimento: new Date(1995, 10, 13), telefone: '31999991234',
      })
      .expect(422)
      .expect({ message: 'Error: "Telefone" must be number.' });

    await request(app)
      .post('/applicant')
      .send({
        nome: 'Leandro Teixeira', email: 'leo@gmail.com', nascimento: new Date(1995, 10, 13), telefone: 31999991234,
      })
      .expect({ message: 'Error: 404' });
  });
});
