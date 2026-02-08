const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');

// Image Upload Config
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/create', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/update/:id', upload.single('image'), blogController.updateBlog);
router.delete('/delete/:id', blogController.deleteBlog);

module.exports = router;
