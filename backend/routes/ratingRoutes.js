const express = require("express");
const router = express.Router();

const { rateDriver, getRatings } = require("../controllers/ratingController");

const { verifyToken } = require("../middleware/auth");

router.post("/:driverId", verifyToken, rateDriver);
router.get("/get/:driverId", getRatings);

module.exports = router;
