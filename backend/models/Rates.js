const mongoose = require("mongoose");

const driverRatingSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    communication: [{ type: Number, default: 0, min: 0, max: 5 }],
    drivingSkills: [{ type: Number, default: 0, min: 0, max: 5 }],
    knowledgeOfRoutes: [{ type: Number, default: 0, min: 0, max: 5 }],
    professionalism: [{ type: Number, default: 0, min: 0, max: 5 }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DriverRating", driverRatingSchema);
