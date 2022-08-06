/* eslint-disable no-undef */
const request = require('supertest');
const sinon = require('sinon');
const applicantModel = require('../../src/model/applicant.model');
const app = require('../../src/app');
const adminModel = require('../../src/model/admin.model');

describe('Email Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Email Controller : Send Email Success', async () => {
    sinon.stub(applicantModel, 'getAllApplicants').resolves(
      [{
        nome: 'Fulano Beltrano de Oliveira da Silva',
        email: 'leandroldteixeira@gmail.com',
        nascimento: (new Date(1995, 10, 13)).toString(),
        telefone: '31996661111',
      }, {
        nome: 'Leandro Teixeira',
        email: 'leandroteixeira3@gmail.com',
        nascimento: (new Date(1995, 10, 13)).toString(),
        telefone: '31996661111',
      }],
    );
    getStub = sinon.stub(adminModel, 'getAdmin').resolves(
      [{
        email: 'leandroteixeira3@gmail.com',
      }],
    );
    const loggedUser = await request(app)
      .post('/login')
      .send({ email: '123', password: '1234' })
      .expect(200);

    const response = await request(app)
      .post('/email')
      .set('Authorization', loggedUser.body.token)
      .send({ subject: 'Testando App', text: 'Testando' });

    // console.log(response);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('previewURL');
    console.log(response.body.previewURL);
  });

  it('Email Controller : Send Email Fail', async () => {
    sinon.stub(applicantModel, 'getAllApplicants').resolves(
      [{
        nome: 'Fulano Beltrano de Oliveira da Silva',
        email: 'leandroldteixeira@gmail.com',
        nascimento: (new Date(1995, 10, 13)).toString(),
        telefone: '31996661111',
      }, {
        nome: 'Leandro Teixeira',
        email: 'leandroteixeira3@gmail.com',
        nascimento: (new Date(1995, 10, 13)).toString(),
        telefone: '31996661111',
      }],
    );
    getStub = sinon.stub(adminModel, 'getAdmin').resolves(
      [{
        email: 'leandroteixeira3@gmail.com',
      }],
    );
    const loggedUser = await request(app)
      .post('/login')
      .send({ email: '123', password: '1234' })
      .expect(200);

    let response = await request(app)
      .post('/email')
      .set('Authorization', loggedUser.body.token)
      .send({ text: 'Testando' });

    expect(response.body).toHaveProperty('message', 'Error: subject is required.');

    response = await request(app)
      .post('/email')
      .set('Authorization', loggedUser.body.token)
      .send({ subject: 'Testando' });

    expect(response.body).toHaveProperty('message', 'Error: text is required.');
  });
});
