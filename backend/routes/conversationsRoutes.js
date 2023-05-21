const router = require("express").Router();
const {
  addConversation,
  getConversation,
  twoUserConversations,
} = require("../controllers/chatController");

//new conversation
router.post("/", addConversation);
router.get("/:userId", getConversation);
router.get("/find/:firstUserId/:secondUserId", twoUserConversations);

module.exports = router;
