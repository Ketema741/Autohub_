const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  saleDate: { type: Date, required: true },
  totalRevenue: { type: Number, required: true },
});

const saleRecordSchema = new mongoose.Schema({
  customerName: { type: String },
  customerPhone: { type: String },
  paymentRefernce: {
    type: String,
  },
  paymentMetada: {
    type: Object,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
});

const models = {
  Sales: mongoose.model("Sales", SaleSchema),
  SaleRecord: mongoose.model("SaleRecord", saleRecordSchema),
};

module.exports = models;
