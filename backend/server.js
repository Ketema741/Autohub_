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
const PORT = process.env.PORT || 6000;
// Define Routes
app.use("/api/authsupplier", require("./routes/supplierAuth"));
app.use("/api/items", require("./routes/items"));
app.use("/api/suppliers", require("./routes/suppliers"));
 
app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});