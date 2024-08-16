// import all the models to establish the relationships
// ----------------------------------------------------

const Category = require('./category');
const Product = require ('./product');
const Tag = require ('./tag');
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
    through: ProductTag,
    foreignKey: "product_id",

    // model: ProductTag,
    // unique: false

    // },
    as: 'product_tag'
});

Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: "tag_id",

    //     model: ProductTag,
    //     unique: false
    // },

    as: 'tag_product'

});

module.exports = { Category, Product, Tag, ProductTag };