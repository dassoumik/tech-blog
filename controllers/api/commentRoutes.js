const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const helpers = require('../../utils/helpers');

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_name,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
    try {
      // Get all blogs and JOIN with user data
      const commentData = await Comment.findAll({ include: [{ all: true, nested: true }]
        // include: [
        //   {
        //     model: User,
        //     attributes: ['user_name'],
        //   },
        // ],
      });
  
      // Serialize data so the template can read it
      const commentObject = commentData.map((comment) => comment.get({ plain: true }));
  
      console.log(req.session.logged_in);
      // Pass serialized data and session flag into template
      res.status(200).json(commentObject);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });


module.exports = router;
