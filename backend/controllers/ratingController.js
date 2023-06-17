const DriverRating = require("../models/Rates");
const models = require("../models/Users");

const rateDriver = async (req, res) => {
  try {
    const { communication, drivingSkills, knowledgeOfRoutes, professionalism } =
      req.body;
    if (
      !communication &&
      !drivingSkills &&
      !knowledgeOfRoutes &&
      !professionalism
    ) {
      res.status(400);
      throw new Error("You should at least give some rating values");
    }

    const { driverId } = req.params;
    const driver = await models.Driver.findById(driverId).select("-password");
    if (!driver) {
      throw new Error("No driver with that id, driver not found");
    }

    const rating = new DriverRating({
      user: req.user.id,
      driver: driver._id,
      communication,
      drivingSkills,
      knowledgeOfRoutes,
      professionalism,
    });

    await rating.save(); // Save the newly created rating document

    const updateDriverRating = await models.Driver.findByIdAndUpdate(
      driver._id,
      {
        $push: {
          "ratings.communication": { $each: rating.communication },
          "ratings.drivingSkills": { $each: rating.drivingSkills },
          "ratings.knowledgeOfRoutes": { $each: rating.knowledgeOfRoutes },
          "ratings.professionalism": { $each: rating.professionalism },
        },
      },
      { new: true }
    ).select("-password");

    if (!rating) {
      res.status(500);
      throw new Error("Rating couldn't be saved. Something went wrong");
    }

    res
      .status(201)
      .json({ updateDriverRating, message: "Rating has been saved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRatings = async (req, res) => {
  try {
    const results = await models.Driver.aggregate([
      {
        $project: {
          _id: 0,
          averageCommunication: { $avg: "$ratings.communication" },
          averageDrivingSkills: { $avg: "$ratings.drivingSkills" },
          averageKnowledgeOfRoutes: { $avg: "$ratings.knowledgeOfRoutes" },
          averageProfessionalism: { $avg: "$ratings.professionalism" },
        },
      },
    ]);

    if (results.length === 0) {
      throw new Error("No ratings found.");
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  rateDriver,
  getRatings,
};
