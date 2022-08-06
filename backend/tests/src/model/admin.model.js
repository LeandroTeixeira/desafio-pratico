const { Op } = require('sequelize');
const { Admin } = require('../../../models/index');

const defaultAttributes = ['email'];

async function getAdmin(email, password) {
  const result = await Admin.findAll({
    attributes: defaultAttributes,
    where: {
      [Op.and]: [{ email }, { password }],
    },
  });
  if (result.length === 0) throw new Error('Not Found.');
  return result[0];
}

module.exports = { getAdmin };
