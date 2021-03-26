const router = require('express').Router();
const { Blog } = require('../../models');

const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  console.log("in here get profile");
  console.log(req.body);
 try {
    res.render("blogs");
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
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
