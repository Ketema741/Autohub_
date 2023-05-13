const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const ItemSchema = new Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },

    tags: {
      type: [String],
      default: [],
    },

    itemImages: {
      type: [Object],
      required: true,
    },
  },
  { timestamps: true }
);

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },

  color: {
    type: String,
    required: true,
  },
  carImages: {
    type: [Object],
    required: true,
  },
});

module.exports = mongoose.model("Car", carSchema);

const models = {
  Item: mongoose.model("Item", ItemSchema),
  Category: mongoose.model("Category", CategorySchema),
  Car: mongoose.model("Car", carSchema),
};

module.exports = models;
