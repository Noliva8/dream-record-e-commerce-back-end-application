const Tags = require ('../Models/tags');
const sequelize = require('../config/connection');
const tagData = require('./tagData.json');





const seedDataBase = async () => {
    try{
        await sequelize.sync({force: true});
        await Tags.bulkCreate(tagData);
        console.log('data seeded');

    } catch(error){
        if(error){
            console.error('error occured during seeding data')
        }
    };

    process.exit(0);
}

seedDataBase();