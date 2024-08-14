// import all the models to establish the relationships
// ----------------------------------------------------

const Category = require('./categories');
const Product = require ('./products');
const Tag = require ('./tags');
const ProductTag = require('./ProductTag');


// Associations between categories and Products
// --------------------------------------------

Category.hasMany (Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',

});

Product.belongsTo(Category, {
    foreignKey: 'category_id'
})




// Associations between products and tags
// --------------------------------------------

Product.belongsToMany(Tag, {
    through:{
    model: ProductTag,
    unique: false

    },
    as: 'product_tag'
});

Tag.belongsToMany(Product, {
    through: {
        model: ProductTag,
        unique: false
    },

    as: 'tag_product'

});

module.exports = { Category, Product, Tag, ProductTag };