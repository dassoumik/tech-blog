const router = require('express').Router();
const { Blog, User, Comment, BlogComment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const helpers = require('../../utils/helpers');

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  sessionDate = new Date;  
//   const value = `
//     ${...req.body}, 
//     user_id: ${req.session.user_name},
//     date_created: ${sessionDate},
//   `;
//   console.log(value);

  try {
    Comment.create({"description": req.body.description, "date_created": sessionDate, "user_id": req.session.user_name, "blog_id": req.body.blog_id})
                                    // .then(comment => {
                                    //     console.log(comment);
                                    //   })
                                      .then(async commentData => {
                                        console.log(commentData);
                                        const blogCommentId = {}
                                        blogCommentId.blog_id = req.body.blog_id;
                                        blogCommentId.comment_id = commentData.id;
                                        try {
                                          await BlogComment.create(blogCommentId);
                                        } catch {err => {console.error(err);}}  
                                        res.status(200).json(commentData);
                                    })

  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/', async (req, res) => {
//     try {
//       // Get all blogs and JOIN with user data
//       const commentData = await Comment.findAll({where: {blog_id: { include: [{ all: true, nested: true }]
//         // include: [
//         //   {
//         //     model: User,
//         //     attributes: ['user_name'],
//         //   },
//         // ],
//       });
  
//       // Serialize data so the template can read it
//       const commentObject = commentData.map((comment) => comment.get({ plain: true }));
  
//       console.log(req.session.logged_in);
//       // Pass serialized data and session flag into template
//       res.status(200).json(commentObject);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });


module.exports = router;
