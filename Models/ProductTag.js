const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class ProductTag extends Model{}

ProductTag.init(
    {
        productTag_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
        },

        product_id :{
            type: DataTypes.INTEGER,
            references: {
                model:'products',
                key: 'product_id'
            }
        },

        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tags',
                key: 'tag_id'
            }
        }

    },

    {
        sequelize,
         freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'productTag'

    }
)


module.exports = ProductTag;