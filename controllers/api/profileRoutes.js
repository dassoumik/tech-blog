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

router.get('/', async (req, res) => {
  console.log("in here get profile");
  console.log(req.body);

  try {
    const profileData = await User.findByPk(req.session.user_name, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
      // ...req.body,
      // user_name: req.session.user_name,
    });
    res.render("profile");
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
        // user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
