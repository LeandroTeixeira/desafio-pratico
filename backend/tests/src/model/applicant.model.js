const { Applicant, Sequelize } = require('../../../models/index');

async function getAllAplicants() {
  const result = await Applicant.find({
    order: [
      ['createdAt', 'DESC'],
    ],
  });
  return result;
}

async function getApplicants(amount) {
  const applicants = await getAllAplicants();
  if (amount > 0 && amount <= applicants.length) return applicants.slice(0, amount);
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

module.exports = { getAllAplicants, getApplicants, upsertApplicant };
