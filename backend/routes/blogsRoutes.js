const express = require("express");
const router = express.Router();

const {
  getBlog,
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

const { verifyToken } = require("../middleware/auth");
const { upload } = require("../configurations/multer")

router.get("/", getBlogs);
router.get("/blog/:id", getBlog);
router.post("/add/blog", verifyToken, upload.single("blogImage"), addBlog);
router.put("/update/blog/:id", verifyToken, updateBlog);
router.delete("/delete/blog/:id", verifyToken, deleteBlog);

module.exports = router;
