
const router =require('express').Router();
const Tags = require('../../Models/tags');
const bcrypt = require('bcrypt');




// ----------------

router.post('/', async (req, res) => {
  try{



    const newTag = await Tags.create(req.body);

    if(!newTag){
      res.status(400).json('no data found');
      return

    }

    res.status(200).json(newTag)


  }catch(error){
    console.error(error);

  }
});

// ----------------
  router.get('/', async (req, res) => {
    try{
      const data = await Tags.findAll();
      if(!data){
        res.status(400).json('No data found');
        return
      }
      res.status(200).json(data);
      
    }catch (error){
      console.error(error)
    }
  })

//  ----------------

 router.get('/seed/:tag_id', async (req, res) =>{
  try{
    const data = await Tags.findByPk(req.params.tag_id);

    if(!data){
      res.status(400).json('no tag_id found');
      return
    }
    res.status(200).json(data);

  }catch(error){
    console.error(error)
  }


 })

// ------------------
  
  
router.get('/:tag_name', async (req, res) =>{
  try{
    const data = await Tags.findOne({where: {tag_name: req.params.tag_name }});
    if(!data){
      res.status(400).json('no data found');
      return

    }
    res.status(200).json(data)

  }catch (error){
    console.error('error occuring during routing');


  }

})



// ----------------
router.put('/:tag_name', async (req, res)=> {
  try{
    
    const data = await Tags.update({description: req.body.description}, {where:{tag_name: req.body.tag_name} });
    if(!data[0]){
      res.status(400).json('no data found');
      return
    }

    res.json(data);


  }catch (error)
  {
    console.error('error occuring during routing');
   
  }
})

// -------------------

router.delete('/:tag_name', async (req, res) =>{
  try{
const data = await Tags.destroy({where:{tag_name : req.params.tag_name}});
if (!data){
  res.status(400).json('no data to delete');
   return
}

  }catch(error){
    console.error('error occuring during routing');
  }
  
})







module.exports = router;