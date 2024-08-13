

// relationship between category and products
// ------------------------------------------


Category.hasMany (Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',

});

Product.belongs(Category)