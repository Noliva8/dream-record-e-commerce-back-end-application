const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../Models');

// The `/api/tags` endpoint


// FIND ALL TAGS
// -------------

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_product' }]
    });

    // Check if tags were found
    if (!allTags.length) {
      return res.status(404).json({ message: 'No tags found!' });
    }

    // Send the fetched tags as a response
    res.status(200).json(allTags);
    
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Failed to fetch tags', error: error.message });
  }
});


// ----------------------------------------------------------



router.get('/:tag_id', async (req, res) => {

try{
  const getTagById = await Tag.findByPk(req.params.tag_id,{
    include: [{model: Product, through: ProductTag, as: 'tag_product'  }]
  });

  if(!getTagById){
     return res.status(404).json({ message: 'No tags found with this id' });
  };
  res.status(200).json(getTagById);

}catch(error){
 console.error('Error fetching tag by id:', error);
    res.status(500).json({ message: 'Failed to fetch tag by this id', error: error.message });
}
 
});


// CREATING TAG
// --------------------------------------


router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });

    // Respond with the created tag and a success status
    res.status(201).json(newTag);

  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Failed to create tag', error: error.message });
  }
});

// UPDATE TAG
// ----------

router.put('/:tag_id', async (req, res) => {
  try {
    // Find the tag by its ID and update its name
    const [updated] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.tag_id } }
    );

    if (updated) {
      // Fetch the updated tag data
      const updatedTag = await Tag.findByPk(req.params.id);
      res.status(200).json(updatedTag);
    } else {
      // If no rows were updated, the ID might not exist
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: 'Failed to update tag', error: error.message });
  }
});


// DELETE TAG
// ----------

router.delete('/:tag_id', async (req, res) => {
  try {
    
    const deleted = await Tag.destroy({
      where: { tag_id: req.params.tag_id }
    });

    if (deleted) {
      // Tag was successfully deleted
      res.status(200).json({ message: 'Tag successfully deleted' });
    } else {
      // No rows were affected, meaning the tag was not found
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ message: 'Failed to delete tag', error: error.message });
  }
});




module.exports = router;
