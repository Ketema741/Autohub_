const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    totalItemsSold: {
      type: Number,
      required: true,
    },
    ItemsSold: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);
module.exports = {
  Transaction: mongoose.model("Transaction", TransactionSchema),
};
