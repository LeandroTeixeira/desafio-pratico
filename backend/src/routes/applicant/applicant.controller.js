const applicantModel = require('../../model/applicant.model');

const getApplicants = async (_, res) => {
  try {
    const response = await applicantModel.getAllApplicants();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const postApplicant = async (req, res) => {
  const {
    nome, email, nascimento, telefone,
  } = req.body;
  if (nome === undefined) {
    return res.status(400).json({ message: 'Error: "Nome" is a required field.' });
  }
  if (email === undefined) {
    return res.status(400).json({ message: 'Error: "email" is a required field.' });
  }
  if (nascimento === undefined) {
    return res.status(400).json({ message: 'Error: "nascimento" is a required field.' });
  }
  if (telefone === undefined) {
    return res.status(400).json({ message: 'Error: "telefone" is a required field.' });
  }

  if (typeof nome !== 'string') {
    return res.status(422).json({ message: 'Error: "Nome" must be string.' });
  }

  if (typeof email !== 'string') {
    return res.status(422).json({ message: 'Error: "Email" must be string.' });
  }

  if (email.match(/[a-z]+[0-z]*@[a-z]+[a-z]+\.[a-z]+[a-z]+.*/) === null) {
    return res.status(422).json({ message: 'Error: Wrong email format.' });
  }

  if (typeof telefone !== 'number') {
    return res.status(422).json({ message: 'Error: "Telefone" must be number.' });
  }

  try {
    await applicantModel.upsertApplicant({
      nome, email, nascimento, telefone,
    });
    const response = await applicantModel.getAllApplicants();
    return res.status(201).json(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { getApplicants, postApplicant };
