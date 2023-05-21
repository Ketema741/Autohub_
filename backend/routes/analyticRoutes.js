const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const { customerLocation } = require("../controllers/analyticController");

router.get("/customers/by/location", verifyToken, customerLocation);
 
module.exports = router;
 