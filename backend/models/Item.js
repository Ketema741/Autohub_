const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
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
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
  },
  carImages: {
    type: [],
    required: true,
  },
});

module.exports = {
  Category: mongoose.model("Category", CategorySchema),
  Item: mongoose.model("Item", ItemSchema),
  Car: mongoose.model("Car", carSchema),
};
