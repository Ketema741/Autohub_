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

    const rating = await DriverRating.create({
      user: req.user.id,
      driver: driver._id,
      communication,
      drivingSkills,
      knowledgeOfRoutes,
      professionalism,
    });

    const updateDriverRating = await models.Driver.findByIdAndUpdate(
      driver._id,
      {
        $push: {
          communication: rating.communication,
          drivingSkills: rating.drivingSkills,
          knowledgeOfRoutes: rating.knowledgeOfRoutes,
          professionalism: rating.professionalism,
        },
      },
      { new: true }
    );

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
    const results = await DriverRating.aggregate([
      {
        $group: {
          _id: "$driver",
          communication: { $avg: "$communication" },
          drivingSkills: { $avg: "$drivingSkills" },
          knowledgeOfRoutes: { $avg: "$communication" },
          professionalism: { $avg: "$drivingSkills" },
        },
      },
    ]);
    console.log(results);
    let averageRatingsByDriver;
    // if (results.length > 0) {
    //   averageRatingsByDriver = results.map((result) => ({
    //     driver: result._id,
    //     averageCommunication: result.averageCommunication,
    //     averageDrivingSkills: result.averageDrivingSkills,
    //   }));
    // } else {
    //   throw new Error("No ratings found.");
    // }
    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json(error.message);
  }
};

// const results = await DriverRating.aggregate([
//   {
//     $group: {
//       _id: "$driver",
//       communication: { $push: "$communication" },
//       drivingSkills: { $push: "$drivingSkills" },
//       knowledgeOfRoutes: { $push: "$knowledgeOfRoutes" },
//       professionalism: { $push: "$professionalism" },
//     },
//   },
// ])
//   .then((results) => {
//     if (results.length > 0) {
//       const pipelineData = results.map((result) => ({
//         driver: result._id,
//         communication: result.communication,
//         drivingSkills: result.drivingSkills,
//       }));
//       console.log(pipelineData);
//     } else {
//       console.log("No ratings found.");
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
module.exports = {
  rateDriver,
  getRatings,
};
