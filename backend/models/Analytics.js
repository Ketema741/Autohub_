const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  saleDate: { type: Date, required: true },
  totalRevenue: { type: Number, required: true },
});

const models = {
  Sales: mongoose.model("Sales", SaleSchema),
};


module.exports = models;
 