const express = require("express");
const router = express.Router();

const {
  getBlog,
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

router.get("/", getBlogs);
router.get("/blog/:id", getBlog);
router.post("/add/blog", addBlog);
router.put("/update/blog/:id", updateBlog);
router.delete("delete/blog/:id", deleteBlog);

module.exports = router;
