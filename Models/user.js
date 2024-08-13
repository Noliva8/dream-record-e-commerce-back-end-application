const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model{}

User.init(
    {

        user_id:{
            type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
        },




        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },



        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true, 
            }
        },


        password:{  
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [8], 
            }
            }




    },

    {
        hooks: {
            beforeCreate: async (newUserData) => {
        newUserData.email = await newUserData.email.toLowerCase();
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
      },

     
            beforeUpdate:  async (updatedUserData) => {
        updatedUserData.email = await updatedUserData.email.toLowerCase();
        updatedUserData.password = await bcrypt.hash ((updatedUserData.password), 10);

        return updatedUserData;
      }
    

    },


       sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'user'

    }
)

module.exports = User;