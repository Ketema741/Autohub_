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
      throw new Error("You should atleast give some rating values");
    }
    const { driverId } = req.params;
    let rate = await DriverRating.create({
      user: req.user.id,
      driver: driverId,
      communication,
      drivingSkills,
      knowledgeOfRoutes,
      professionalism,
    });
    if (!rate) {
      res.status(500);
      throw new Error("Rate couldn't! something went wrong");
    }
    res.status(201).json({ message: "Rating has been saved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  rateDriver,
};
