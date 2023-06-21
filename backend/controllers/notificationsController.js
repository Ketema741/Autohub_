const Notification = require("../models/Notification");
const models = require("../models/Users")
const { getUserById } = require("./usersController");

const sendNotification = async (req, res) => {
  try {
    const { message, recipient, content } = req.body;
    const _recipient = await getUserById(recipient);
    if (!_recipient) {
      res.status(404);
      throw new Error("User not found");
    }

    const notification = new Notification({
      message,
      recipient:_recipient,
      content,
    });
    await notification.save();

    res
      .status(200)
      .json({ success: true, message: "Notification sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the notification.",
    });
  }
};

const sendNotificationToAll = async (req, res) => {
  try {
    const { category, message, content } = req.body;

    let users;

    switch (category) {
      case "admin":
        users = await models.Admin.find({});
        break;
      case "supplier":
        users = await models.Supplier.find({});
        break;
      case "serviceProvider":
        users = await models.ServiceProvider.find({});
        break;
      case "driver":
        users = await models.Driver.find({});
        break;
      case "customer":
        users = await models.Customer.find({});
        break;
      case "temporarySupplier":
        users = await models.TemporarySupplier.find({});
        break;
      default:
        users = [];
    }

    const notifications = users.map((user) => ({
      message,
      content,
      recipient: user._id,
    }));

    await Notification.insertMany(notifications);

    res.status(200).json({
      success: true,
      message: "Notification sent to all users successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending the notification.",
    });
  }
};

const getNotification = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ recipient: userId });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    await Notification.findOneAndRemove({
      _id: notificationId,
      recipient: userId,
    });

    res.json({ message: "Notification removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

setInterval(async () => {
  try {
    const expirationTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    await Notification.deleteMany({ createdAt: { $lt: expirationTime } });
  } catch (error) {
    console.error(error);
  }
}, 24 * 60 * 60 * 1000);

module.exports = {
  sendNotification,
  getNotification,
  sendNotificationToAll,
  deleteNotification,
};
