const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');




class Product extends Model{}

Product.init(

{

        user_id:{
            type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
},

product_name: {
    type: DataTypes.STRING,
            allowNull: false,
},

price : {
   type: DataTypes.INTEGER,
            allowNull: false, 
},

stock:{

     type: DataTypes.INTEGER,
            allowNull: false, 

}

},


{



        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'product'


}

)




module.exports = Product;