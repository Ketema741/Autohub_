const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: "Job must have a title ",
    },
    excerpt: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    salary: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    jobImages: {
      type: [Object],
    },
    applicants: [
      {
        applicant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Driver",
        },
        applicant_info: {
          type: Object,
          required: true,
        },
        resume: {
          url: {
            type: String,
            required: "Please upload your remsume",
          },
          public_id: {
            type: String,
            required: "Please upload your remsume",
          },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
