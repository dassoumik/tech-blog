const User = require('./User');
const Blog = require('./Blog');

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

module.exports = { User, Blog };
