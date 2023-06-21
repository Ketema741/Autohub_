const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const {
  customerLocation,
  getDailySales,
} = require("../controllers/analyticController");

router.get("/customers/by/location", verifyToken, customerLocation);
router.get("/daily/sales", verifyToken, getDailySales);
module.exports = router;
