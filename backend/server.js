require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());

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

app.use("/api/users", require("./routes/users"));

// Gatwech 
app.use("/api/blogs", require("./routes/blogs"));
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
