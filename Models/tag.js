const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for tags
class Tag extends Model{}

Tag.init(
    {

        tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
        tag_name:{
            type: DataTypes.STRING,
        },
    },

    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'tag'
    }
)


module.exports = Tag;