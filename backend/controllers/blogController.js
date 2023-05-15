require("dotenv").config();
const model = require("../models/Blog");
const {
  purgeFromCloudinary,
  uploadToCloudinary,
} = require("../configurations/cloudinary");

// Get blog post
const getBlogs = async (req, res) => {
  try {
    const blogs = await model.Blog.find({})
      .sort({ date: -1 })
      .populate("user", "firstName userImage bio email ");

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const getBlog = async (req, res) => {
  try {
    let blog = await model.Blog.findById(req.params.id).populate(
      "user",
      "firstName userImage bio email "
    );
    if (!blog) return res.status(404).json({ msg: req.params.id });
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, excerpt, description, category, summary } = req.body;
    if (!title || !excerpt || !summary || !description || !category) {
      res.status(400);
      throw new Error("Please, add all the required fields");
    }

    const imageFile = req.file;
    const images_data = await uploadToCloudinary(imageFile.path, "images");

    const _blog = await model.Blog.create({
      author: req.user._id,
      title,
      excerpt,
      description,
      category,
      summary,
      blogImage: images_data,
    });
    if (_blog) {
      const blog = await model.Blog.findByIdAndUpdate(
        { _id: _blog._id },
        {
          blogImage: images_data,
        }
      );

      res.status(201).json({
        data: blog,
        message: "Blog posted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  const blogFields = req.body
  try {
    let blog = await model.Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error("blog not found");
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized, Only Author can modified a blog post" });
    }

    blog = await model.Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blogFields },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await model.Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error("blog not found");
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const deletedBlog = await blog.findByIdAndRemove(req.params.id);
    const { images } = deletedBlog;
    const action = images.map((image) => purgeFromCloudinary(image.public_id));
    await Promise.all(action);
    console.log(images);

    res.status(200).json({ msg: "blog removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
