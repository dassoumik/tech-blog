const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const withAuth = require('../../utils/auth');


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;