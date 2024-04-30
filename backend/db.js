
const mongoose = require('mongoose');
const { DB_URL } = require('./config');

mongoose.connect(DB_URL);

const User = mongoose.model('User', {
    email: String,
    name: String,
    password: String,
  });
  
  const Blog = mongoose.model('Blog', {
    caption: String,
    content: String,
    publishedDate: String,
    published: Boolean,
    authorId: String,
    author: Object,
    comment: Array,
    like: Array
});

module.exports = {User, Blog}
