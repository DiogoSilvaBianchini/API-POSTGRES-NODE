'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  Product.init({
    title: DataTypes.STRING,
    describe: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.INTEGER,
    img: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};