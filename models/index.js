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
  as: 'commentedBlog',
  constraints: false,
});

Comment.belongsTo(Blog, {
  foreignKey: 'id',
  as: 'blogComments',
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



module.exports = { User, Blog, Comment };
