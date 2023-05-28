const DriverRating = require("../models/Rates");
const models = require("../models/Users");

// const rateDriver = async (req, res) => {
//   try {
//     const { communication, drivingSkills, knowledgeOfRoutes, professionalism } =
//       req.body;
//     if (
//       !communication &&
//       !drivingSkills &&
//       !knowledgeOfRoutes &&
//       !professionalism
//     ) {
//       res.status(400);
//       throw new Error("You should atleast give some rating values");
//     }

//     const { driverId } = req.params;
//     const driver = await models.Driver.findById(driverId).select("-password");
//     if (!driver) {
//       throw new Error("No driver with that id, driver not found");
//     }
//     let rate = await DriverRating.create({
//       user: req.user.id,
//       driver: driver._id,
//       communication,
//       drivingSkills,
//       knowledgeOfRoutes,
//       professionalism,
//     });
//     if (!rate) {
//       res.status(500);
//       throw new Error("Rate couldn't! something went wrong");
//     }
//     res.status(201).json({ driver, message: "Rating has been saved" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
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

     await models.Driver.findByIdAndUpdate(driver._id, {
       $addToSet: { ratings: rating._id },
     });
    
    if (!rating) {
      res.status(500);
      throw new Error("Rating couldn't be saved. Something went wrong");
    }

    res.status(201).json({ driver, message: "Rating has been saved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  rateDriver,
};
