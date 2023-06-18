const express = require("express");
const router = express.Router();

const {
  getNotification,
  sendNotification,
  sendNotificationToAll,
  deleteNotification,
} = require("../controllers/notificationsController");

const { verifyToken } = require("../middleware/auth");

router.post("/send", sendNotification);
router.post("/send-to-all", sendNotificationToAll);
router.get("/user/:userId", getNotification);
router.delete("/:id", verifyToken, deleteNotification);

module.exports = router;
