const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { customerLocation } = require("../controllers/analyticController");

router.get("/customer-by-location", verifyToken, customerLocation);

module.exports = router;