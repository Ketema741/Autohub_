const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    blogImages: {
      type: [Object],
    },
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: {
      type: [String],
    },
    timeline: {
      type: [String],
    },

    takeaways: {
      type: [String],
    },
    comments: {
      type: [String],
    },
  },
  { timestamps: true }
);

const models = {
  Blog: mongoose.model("Blog", BlogSchema),
};

module.exports = models;
