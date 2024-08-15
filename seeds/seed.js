// Imports all the models
// ----------------------
const { Category, Product, Tag, ProductTag } = require('../Models');

// Import sequelize
// --------------
const sequelize = require('../config/connection');

// Import JSON data
// ----------------
const tagData = require('./tagData.json');
const categoryData = require('./categoryData.json');
const productData = require('./productData.json');
const productTagData = require('./productTagData.json');

// Seeding Database
// --------------
const seedDataBase = async () => {
    try {
        // Synchronize the database
        await sequelize.sync({ force: true });
        console.log('Database synchronized');

        // Seed categories
        await Category.bulkCreate(categoryData);
        console.log('Category seeded');

        // Seed tags
        await Tag.bulkCreate(tagData);
        console.log('Tag seeded');

        // Seed products
        await Product.bulkCreate(productData);
        console.log('Product seeded');

        // Seed product-tag associations
        await ProductTag.bulkCreate(productTagData);
        console.log('Products-Tags seeded');
        
    } catch (error) {
        console.error('Error occurred during seeding data:', error.message);
        console.error(error.stack);
    } finally {
        // Ensure process exits even if there's an error
        process.exit(0);
    }
}

seedDataBase();
