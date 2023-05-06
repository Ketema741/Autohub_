const express = require("express");
const router = express.Router();

const {
  addJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
  jobApplication,
  jobsAccptenceMail,
} = require("../controllers/jobsController");
const { verifyToken } = require("../middleware/auth");
const { upload } = require("../configurations/multer");

router.get("", getJobs);
router.get("/:id", getJob);
router.post("/post-job", verifyToken, addJob);
router.put("/job/update/:id", verifyToken, updateJob);
router.delete("/job/delete/:id", verifyToken, deleteJob);
router.post("/job/acceptence", verifyToken, jobsAccptenceMail)

router.post(
  "/job/apply/:id",
  verifyToken,
  upload.single("resume"),
  jobApplication
);

module.exports = router;