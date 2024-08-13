const router = require('express').Router();
const tagsRoutes = require('./tagsRoutes');
const userRoutes =require('./userRoute');


router.use('/tags', tagsRoutes);
router.use('/user', userRoutes);





module.exports = router;