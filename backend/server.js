require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

<<<<<<< HEAD
// connect Database
connectDB();

// Init Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});
const PORT = process.env.PORT || 8080;
// Define Routes
app.use("/api/authsupplier", require("./routes/supplierAuth"));
app.use("/api/users", require("./routes/users"));
// app.use("/api/items", require("./routes/items"));
// app.use("/api/suppliers", require("./routes/suppliers"));

// Gatwech 
app.use("/api/blogs", require("./routes/blogs"));
=======
>>>>>>> 3c1a62602fdc165b4d8bf435239269150b43f05d
app.use("/users", require("./routes/UsersRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));
app.use("/items", require("./routes/itemRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/blogs", require("./routes/blogsRoutes"));
app.use("/analytics", require("./routes/analyticRoutes"));
// Connect to mongodb atlas in the cloud
const port = process.env.PORT || 6767;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
