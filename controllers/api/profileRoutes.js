const router = require('express').Router();
const {
  Blog
} = require('../../models');

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

router.get('/:id', async (req, res) => {
  console.log("in here get profile");
  console.log(req.params.id);

  try {
    const sessionData = new Date();
    const newBlog = await Blog.findByPk(req.params.id);
    console.log(newBlog.blog.dataValues);
    res.render("blogupdate", {
      blogdata: newBlog.dataValues,
      user_name: req.session.user_name,
      date_time: sessionData,
      logged_in: req.session.logged_in,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({
        message: 'No blog found with this id!'
      });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;