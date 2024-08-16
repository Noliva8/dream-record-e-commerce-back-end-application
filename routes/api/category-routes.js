const router = require('express').Router();
const { Category, Product,  ProductTag } = require('../../Models');

// The `/api/categories` endpoint

//  ALL CATEGORIES
// ---------------

router.get('/', async (req, res) => {
 try{

    const allCategories = await Category.findAll({
      include:[{ model: Product }],
    });

    if( allCategories.length === 0 ){
      console.log('no categories found ');
      return res.status(404).json({ message: 'No categories found' });
    }
    res.status(200).json(allCategories);

  }catch(error){
    res.status(500).json(error);

  }
});
// --------------------------------------------------------------



// FIND CATEGORY BY ID
// --------------------

router.get('/:category_id', async (req, res) => {
  try {
    // Fetch category by primary key with associated products
    const categoryById = await Category.findByPk(req.params.category_id, {
      include: [{ model: Product }],
    });

    // Check if the category was found
    if (!categoryById) {
      return res.status(404).json({ message: 'No category found with that id!' });
    }

    // Send the category data as a JSON response
    res.status(200).json(categoryById);

  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching category:', error);

    // Send the error response
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// ----------------------------------------------------------------------



// CREATE NEW CATEGORY
// ------------------

router.post('/', async (req, res) => {
  
  try{
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    console.log(`New category created: ${newCategory}`);

    res.status(200).json({ message: 'Category created successfully' });

  }catch(error){
    console.error('error creating category');
    res.status(500).json({ message: 'Failed to create category', error: error.message });

  }
});



// UPDATE CATEGORY BY ID
// ---------------------

router.put('/:category_id', async (req, res) => {
  try {
    // Update the category with the given id
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name, 
      },
      {
        where: {
          category_id: req.params.category_id
        }
      }
    );

    // Check if any rows were updated
    if (updatedCategory === 0) {
      return res.status(404).json({ message: 'No category found with that id!' });
    }

    // Log a message indicating the update was successful
    console.log(`Category updated: ${req.params.category_id}`);

    // Send a success response
    res.status(200).json({ message: 'Category updated successfully' });

  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error updating category:', error);

    res.status(500).json({ message: 'Failed to update category', error: error.message });
  }
});

// ---------------------------------------------------------------------

// DELETE CATAEGORY
// -----------------

router.delete('/:category_id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        category_id: req.params.category_id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category data found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
