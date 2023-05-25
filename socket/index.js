const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // When a new user connects
  console.log("A user connected.");

  // Take userId and socketId from the user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and receive messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User not found");
    }
  });

  // Send notification to a specific user
  socket.on("sendNotificationToUser", ({ message, recipientId }) => {
    const user = getUser(recipientId);
    if (user) {
      io.to(user.socketId).emit("getNotification", { message });
    } else {
      console.log("Recipient not found");
    }
  });

  // Send notification to all recipients
  socket.on("sendNotificationToAllUsers", ({ message }) => {
    io.emit("getNotification", { message });
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
