const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
 
  orderNumber: {
    type: String,
  },
 
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentId: {
    type: String,
    default: null,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },

  items: [
    {
      name: {
        type: String,
        required: true,
      },
      supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        autopopulate: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: { type: Number },
});

const models = {
  Order: mongoose.model("Order", OrderSchema),
};

 
module.exports = models;
 
