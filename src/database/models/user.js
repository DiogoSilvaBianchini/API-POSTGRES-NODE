'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    buy_list: { 
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    favority_list: { 
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};