const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String, // Add this field for the image URL
  videoUrl: String, // Add this field for the video URL
  link: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;