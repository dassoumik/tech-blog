const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const profileRoutes = require('./profileRoutes');
const commentRoutes = require('./commentRoutes');


const withAuth = require('../../utils/auth');


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/profile', profileRoutes);
router.use('/comments', commentRoutes);



module.exports = router;