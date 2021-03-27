const router = require('express').Router();
const { Blog, User } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const helpers = require('../../utils/helpers');

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

router.get('/:id', withAuth, async (req, res) => {
  console.log("in here get blog");
  console.log(req.body);
 try {
  const sessionData = new Date();
  // console.log(req.URLSearchParams.type);
  const newBlog = await Blog.findByPk(req.params.id, {
    include: [{ all: true, nested: true }],
    // include: [{model: User, as: 'blogUsers'}]
  // }); 
  
    // ...req.body,
    // user_id: req.session.user_name,
  });
  console.log(newBlog);
  // const blogs_det = newBlog.map((blog) =>
  //     blog.get({ plain: true }));
  // console.log("blogs" + blogs_det);  
  if (true)  {
      res.render("blogupdate", {
      blogdata: newBlog.dataValues,
      user_name: req.session.user_name,
      date_time: sessionData,
      logged_in: req.session.logged_in,
    });
  } else {
      res.render('blogsdetail', {
      blogs: newBlog.dataValues,
      user_name: req.session.user_name,
      date_time: sessionData,
      logged_in: req.session.logged_in,
    },);}
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
