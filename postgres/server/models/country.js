'use strict';
module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in1960: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    in1970: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    in1980: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    in1990: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    in2000: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    in2010: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    in2016: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  }, {});
  Country.associate = function(models) {
    // associations can be defined here
  };
  return Country;
};