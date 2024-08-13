const User = require('../../Models/user');
const router =require('express').Router();


// create user
// -----------

router.post('/', async (req, res) =>{
    try{
          const newUser = await  User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }     
          ) 
         if(!newUser){
            res.status(400).json('user not created');
            return
         }

         res.status(200).json('user created')
      
    }

    catch(error){
        console.error('error occured during creating user');
        res.status(500).json({ error: 'Failed to create user' });
    }
})



// update the user
// ---------------

router.put('/:name', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        name: req.params.name,
      },
      individualHooks: true
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this name!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// display the user
// ---------------

router.get('/', async (req, res) =>{
    try{
        const data =  await User.findAll();
        if (!data) {
      res.status(404).json({ message: 'No user with this name!' });
      return;
    }
    res.status(200).json(data);

    }catch (err) {
    res.status(500).json(err);
  }

})












// delete the user
// ---------------










module.exports = router;