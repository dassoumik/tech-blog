const router = require('express').Router();
const {
  Blog,
  User
} = require('../models');
const withAuth = require('../utils/auth');
const helpers = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{
        all: true,
        nested: true
      }]
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({
      plain: true
    }));

    console.log(req.session.logged_in);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
      helpers,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{
        all: true,
        nested: true
      }]
    });

    const blog = blogData.get({
      plain: true
    });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/api/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    console.log(req.session.user_name);
    const userData = await User.findByPk(req.session.user_name, {
      include: [{
        all: true,
        nested: true
      }],
      attributes: {
        exclude: ['password']
      },
    });

    const users = userData.get({
      plain: true
    });
    res.render('profile', {
      ...users,
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/api/profile');
    return;
  }

  const newLocal = 'login';
  res.render(newLocal);
});

module.exports = router;