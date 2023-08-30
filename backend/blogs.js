/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Blog = require('./Blog');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'assets'));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.use('/assets', express.static(path.join(__dirname, './assets')));

// GET all blogs
router.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});

// POST a new blog with file uploads (image and video)
router.post('/api/blogs', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, content, link } = req.body;
    const newBlog = new Blog({ title, content, link });

    console.log('Incoming files:', req.files);

    if (req.files) {
      // Handle image upload
      if (req.files.file) {
        console.log('Image file:', req.files.file);
        newBlog.imageUrl = `/assets/${req.files.file[0].filename}`;
      }

      // Handle video upload
      if (req.files.video) {
        console.log('Video file:', req.files.video);
        newBlog.videoUrl = `/assets/${req.files.video[0].filename}`;
      }
    }

    console.log('New blog data:', newBlog);

    await newBlog.save();
    res.status(201).json({ message: 'Blog added successfully' });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ error: 'Error adding blog' });
  }
});

module.exports = router;