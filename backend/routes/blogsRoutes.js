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
router.get("/:id", getBlog);
router.post("/", addBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
