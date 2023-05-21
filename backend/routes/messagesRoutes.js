const router = require("express").Router();

const { getMessages, addMessage } = require("../controllers/chatController");

router.post("/", addMessage);
router.get("/:conversationId", getMessages);

module.exports = router;
