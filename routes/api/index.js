const router = require('express').Router();
const tagsRoutes = require('./tagsRoutes');


router.use('/tags', tagsRoutes);





module.exports = router;