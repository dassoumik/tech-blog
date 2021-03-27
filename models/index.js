const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
const BlogComment = require('./BlogComment');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'blogUsers',
  constraints: false,
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'blogs'
});

Comment.hasOne(Blog, {
  foreignKey: 'blog_id',
  as: 'BlogComment',
  constraints: false,
});

Blog.belongsToMany(Comment, {
  as: 'commentedBlog',
  through: {
    model: BlogComment,
    foreignKey: 'comment_id',
    foreignKey: 'blog_id',
    unique: false,
    // onDelete: 'CASCADE',
  },
  constraints: false,
});

User.hasMany(Comment, {
  foreignKey: 'user_name',
  onDelete: 'CASCADE',
  as: 'commentedUser',
  constraints: false,
});

Comment.belongsTo(User, {
  foreignKey: 'user_name',
  as: 'userComments',
  constraints: false,
});


module.exports = { User, Blog, Comment, BlogComment };
