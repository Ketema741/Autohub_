require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/UsersRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));
app.use("/items", require("./routes/itemRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("analytics", require("./routes/analyticRoutes"));
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
