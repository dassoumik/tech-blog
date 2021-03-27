const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


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

Blog.hasMany(Comment, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
  as: 'blog',
  constraints: false,
});

Comment.belongsTo(Blog, {
  foreignKey: 'id',
  as: 'blogComments'
});

module.exports = { User, Blog, Comment };
