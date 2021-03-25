const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const profileRoutes = require('./profileRoutes');

const withAuth = require('../../utils/auth');


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/profile', profileRoutes);


module.exports = router;