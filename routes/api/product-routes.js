const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../Models');

// The `/api/products` endpoint

// get all products
// ----------------

router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [
        Category,
        { model: Tag, through: ProductTag, as: 'product_tag' }
      ]
    });

    // Check if products were found
    if (!allProducts.length) {
      return res.status(404).json({ message: 'No products found!' });
    }

    // Send the fetched products as a response
    res.status(200).json(allProducts);
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});


// --------------------------------------------------


// get one product
// ----------------

router.get('/:product_id', async (req, res) => {
  try {
    const productById = await Product.findByPk(req.params.product_id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: 'product_tag' }
      ]
    });

    if (!productById) {
      return res.status(404).json({ message: 'No product found with that id!' });
    }

    // Return the product data with its associated Category and Tag data
    res.status(200).json(productById);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
});




// ----------------------------------------------------------------------------------

// create new product
// ------------------

// router.post('/', (req, res) => {
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }
//   */
//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });


router.post('/', async (req, res) => {
  try {
    // Destructure the request body
    const { product_name, price, stock, category_id, tagIds = [] } = req.body;

    // Create a new product
    const newProduct = await Product.create({
      product_name,
      price,
      stock,
      category_id
    }
    );

    // Check if there are tag IDs to associate
    if (tagIds.length) {
      // Create associations between the product and tags
      const productTagIdArr = tagIds.map(tag_id => ({
        product_id: newProduct.id, 
      }));
      
      await ProductTag.bulkCreate(productTagIdArr);
    }

   
    res.status(200).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);  
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
});






// -------------------------------------------------------------------

// update product
// --------------

// router.put('/:product_id', (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.product_id,
//     },
//   })
//     .then((product) => {
//       if (req.body.tagIds && req.body.tagIds.length) {
        
//         ProductTag.findAll({
//           where: { product_id: req.params.id }
//         }).then((productTags) => {
//           // create filtered list of new tag_ids
//           const productTagIds = productTags.map(({ tag_id }) => tag_id);
//           const newProductTags = req.body.tagIds
//           .filter((tag_id) => !productTagIds.includes(tag_id))
//           .map((tag_id) => {
//             return {
//               product_id: req.params.id,
//               tag_id,
//             };
//           });

//             // figure out which ones to remove
//           const productTagsToRemove = productTags
//           .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//           .map(({ id }) => id);
//                   // run both actions
//           return Promise.all([
//             ProductTag.destroy({ where: { id: productTagsToRemove } }),
//             ProductTag.bulkCreate(newProductTags),
//           ]);
//         });
//       }

//       return res.json(product);
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });




router.put('/:product_id', async (req, res) => {
  try {
    // Update the product
    const updatedProduct = await Product.update(req.body, {
      where: {
        product_id: req.params.product_id,
      },
      returning: true, // Use this to get the updated product if needed
    });

    if (!updatedProduct[0]) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if there are tags to update
    if (req.body.tagIds && req.body.tagIds.length) {
      // Find existing product tags
      const existingProductTags = await ProductTag.findAll({
        where: { product_id: req.params.product_id }
      });

      // Create a list of existing tag IDs
      const existingTagIds = existingProductTags.map(({ tag_id }) => tag_id);

      // Create new product tags to add
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !existingTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.product_id,
          tag_id,
        }));

      // Determine which tags need to be removed
      const tagsToRemove = existingProductTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Remove old tags and add new ones
      await Promise.all([
        ProductTag.destroy({ where: { id: tagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Return the updated product
    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
});



// delete product
// --------------

router.delete('/:product_id', async (req, res) => {
  try {
    const productId = req.params.product_id;

    // Find the product to ensure it exists
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated product tags
    await ProductTag.destroy({
      where: { product_id: productId },
    });

    // Delete the product
    await Product.destroy({
      where: { product_id: productId },
    });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});


module.exports = router;
