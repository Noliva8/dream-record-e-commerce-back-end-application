
const router =require('express').Router();
const Tags = require('../../Models/tags');


router.post('/', (req, res) =>{

// create Tag
// -----------

Tags.create({
    tag_name: req.body.tag_name,
    description: req.body.description

})
.then((newTag) => {
      // Send the newly created row as a JSON object
      res.json(newTag);
      res.send('tag created')
    })
    .catch((err) => {
      res.json(err);
    });

})












module.exports = router;