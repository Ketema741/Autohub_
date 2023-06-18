const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
      supplierId: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
