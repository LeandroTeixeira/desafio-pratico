const applicantModel = require('../src/model/applicant.model');
const { sequelize } = require('../../models');
/* eslint-disable no-undef */
describe('Applicant Model', () => {
  afterAll(async () => {
    sequelize.close();
  });
  it('Get Admin', async () => {
    const response = await applicantModel.getAdmin('leandroteixeira@in8.com.br', '12345');
    expect(response).toEqual({ email: 'leandroteixeira@in8.com.br' });

    await expect(async () => { await adminModel.getAdmin('leandroteixeira@in8.com.br', '123'); })
      .rejects
      .toThrow('Not Found.');

    await expect(async () => { await adminModel.getAdmin('leandroteixeira@in8.com..br', '12345'); })
      .rejects
      .toThrow('Not Found.');

    await expect(async () => { await adminModel.getAdmin('leandroteixeira@in8.com..br', '123465'); })
      .rejects
      .toThrow('Not Found.');
  });
});
