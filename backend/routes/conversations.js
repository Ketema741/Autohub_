const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  const existingConversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (existingConversation) {
    return res.status(409).json({ message: "Conversation already exists" });
  }

  // Create a new conversation with unique members
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
