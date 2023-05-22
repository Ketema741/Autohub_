const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: "Job must have a title ",
    },
    description: {
      type: String,
      required: true,
    },
    address: {
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
    active: {
      type: Boolean,
      default: true,
    },
    applicants: [
      {
        applicant_info: {
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          telephone: {
            type: String,
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
          description: {
            type: String,
          },
        },
        resume: {
          url: {
            type: String ,
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