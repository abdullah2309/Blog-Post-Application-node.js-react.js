const Blog = require('../models/blog_post');

exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      subtitle: req.body.subtitle,
      image: req.file ? req.file.filename : null,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

exports.updateBlog = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      subtitle: req.body.subtitle,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
};
