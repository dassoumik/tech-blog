const router = require('express').Router();
const {
  Blog,
  User
} = require('../../models');
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
    }, );
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  console.log("in here get blog");
  console.log(req.body);
  try {
    const sessionData = new Date();
    const newBlog = await Blog.findByPk(req.params.id, {
      include: [{
        all: true,
        nested: true
      }],
    });
    console.log(newBlog);
    
    if (true) {
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
      }, );
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  // update a blog by its `id` value
  console.log("in put");
  console.log(req.body);
  try {
    const blogUpdateData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(blogUpdateData => {
      console.log(blogUpdateData);
      if (!blogUpdateData[0]) {
        res.status(404).json({
          message: 'No blog with this id!'
        });
        return;
      }
      res.status(200).json(blogUpdateData);
    });
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