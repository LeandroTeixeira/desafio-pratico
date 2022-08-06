/* eslint-disable no-undef */
const request = require('supertest');
const sinon = require('sinon');
const adminModel = require('../../src/model/admin.model');
const app = require('../../src/app');

describe('Login Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Login Controller : Post Login succesfull cases', async () => {
    const getStub = sinon.stub(adminModel, 'getAdmin').resolves(
      [{
        email: 'leandroteixeira3@gmail.com',
      }],
    );
    let loggedUser = await request(app)
      .post('/login')
      .send({ email: '123', password: '1234' })
      .expect(200);

    expect(loggedUser.body).toHaveProperty('token');
    expect(loggedUser.body).toHaveProperty('admin', {
      email: 'leandroteixeira3@gmail.com',
    });

    sinon.assert.calledWithExactly(getStub.firstCall, '123', '1234');

    loggedUser = await request(app)
      .post('/login')
      .send({ email: '123', password: '1234' })
      .expect(200);
    sinon.assert.calledWithExactly(getStub.secondCall, '123', '1234');
  });

  it('Login Controller : Post Login fail cases', async () => {
    sinon.stub(adminModel, 'getAdmin').throws(new Error('Error: 404'));

    await request(app)
      .post('/login')
      .send({})
      .expect(400)
      .expect({ message: 'Error: Password is required.' });

    await request(app)
      .post('/login')
      .send({ password: 1224 })
      .expect(400)
      .expect({ message: 'Error: It\'s required to provide email for logging in.' });

    await request(app)
      .post('/login')
      .send({ email: '123', password: 1234 })
      .expect({ message: 'Error: 404' });
  });
});
