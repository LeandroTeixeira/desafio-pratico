const { Applicant, Sequelize } = require('../../models/index');

const defaultAttributes = ['nome', 'email', 'nascimento', 'telefone'];

async function getAllApplicants() {
  const result = await Applicant.findAll({
    attributes: defaultAttributes,

    order: [
      ['createdAt', 'DESC'],
    ],
  });
  return result;
}

async function getApplicants(amount) {
  const applicants = await getAllApplicants();
  if (amount >= 0 && amount <= applicants.length) return applicants.slice(0, amount);
  return applicants;
}

async function upsertApplicant(applicant) {
  const defaultApplicant = {
    createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
  };
  const [newApplicant, created] = await Applicant.upsert({ ...defaultApplicant, ...applicant });
  if (created) return { applicant: newApplicant, message: 'Applicant succesfully created.' };
  return { applicant: newApplicant, message: 'Applicant succesfully updated.' };
}

module.exports = { getAllApplicants, getApplicants, upsertApplicant };
