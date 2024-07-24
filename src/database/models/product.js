'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  Product.init({
    title: DataTypes.STRING,
    describe: DataTypes.STRING,
    price: DataTypes.STRING,
    imgs: { 
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: "products"
  });
  return Product;
};