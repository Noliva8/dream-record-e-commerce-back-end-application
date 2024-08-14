const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        isDecimal: true
      }

    },
    
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:{
         isNumeric: true,
      }
    },
    
    category_id:{
        type: DataTypes.INTEGER,
        references: {
                model: 'categories',
                key: 'category_id'
        }

    }
  },


  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
