const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model { }
  Applicant.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Applicant',
  });
  return Applicant;
};
