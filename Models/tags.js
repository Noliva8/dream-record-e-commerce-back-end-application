const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for tags
class Tags extends Model{}

Tags.init(
    {

        tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
        tag_name:{
            type: DataTypes.STRING,
            allowNull: false,

        },

        description:{
            type: DataTypes.STRING,
            allowNull: false,
        }

    },

    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'tags'
    }
)


module.exports = Tags;