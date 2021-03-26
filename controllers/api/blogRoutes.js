const router = require('express').Router();
const { Blog } = require('../../models');
const session = require('express-session');


const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_name,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  console.log("in here get blog");
  console.log(req.session);
 try {
  const sessionData = new Date();
  console.log(sessionData);
    res.render('blogs', {
      user_name: req.session.user_name,
      date_time: sessionData,
      logged_in: req.session.logged_in,
    },);
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
