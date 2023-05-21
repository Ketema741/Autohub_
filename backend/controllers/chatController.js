const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const addConversation = async (req, res) => {
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
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
const twoUserConversations = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// messaging
const addMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getMessages,
  addMessage,
  addConversation,
  getConversation,
  twoUserConversations,
};
