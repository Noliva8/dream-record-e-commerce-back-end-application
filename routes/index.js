const router = require('express').Router();
const tagsRoutes = require('./api');


router.use('/api', tagsRoutes );




module.exports = router;
