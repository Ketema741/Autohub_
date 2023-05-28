const router = require("express").Router();

const { chapaInit } = require("../middleware/stripe");

router.post("/checkout/orders", chapaInit);

module.exports = router;
