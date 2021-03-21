const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
  foreignKey: 'user_name',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_name'
});

module.exports = { User, Blog };
