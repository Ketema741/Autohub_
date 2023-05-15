require("dotenv").config();
const model = require('../models/Blog')
const { purgeFromCloudinary, uploadToCloudinary } = require("../configurations/cloudinary");

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
  const {
    title,
    excerpt,
    description,
    category,
    summary,
    steps,
    takeaways,
    timeline,
  } = req.body;


  try {
    const newBlog = new model.Blog({
      title,
      excerpt,
      description,
      category,
      summary,
      steps,
      takeaways,
      timeline,
      user: req.user.id,
    });
   
    const blogImage = req.files;
    const imgs = imageFiles.map((img) =>
      uploadToCloudinary(img.path, "images")
    );
    const images_data = await Promise.all(imgs);
    // const category = await models.Category.findById(categoryId);
    
    // if (item) {
    //   await models.Item.findByIdAndUpdate(
    //     { _id: item._id },
    //     {
    //       $addToSet: { itemImages: images_data },
    //     }
    //   );
    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    let blog = await model.Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error("blog not found");
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    blog = await blog.findByIdAndUpdate(
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
