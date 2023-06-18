const express = require("express");
const router = express.Router();

const {
  getBlog,
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  getBlogByAuthor,
} = require("../controllers/blogController");

const { verifyToken } = require("../middleware/auth");
const { upload } = require("../configurations/multer");

router.get("/", getBlogs);
router.get("/blog/:id", getBlog);
router.get("/author/blogs", verifyToken, getBlogByAuthor);
router.post("/add/blog", verifyToken, addBlog);
router.put("/update/blog/:id", verifyToken, updateBlog);
router.delete("/delete/blog/:id", verifyToken, deleteBlog);

module.exports = router;
