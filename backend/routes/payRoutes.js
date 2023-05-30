const router = require("express").Router();

const { chapaInit, chapaVerify } = require("../middleware/chapa");

router.post("/checkout/orders/:orderId", chapaInit);
router.get("/verify/payment/:orderId", chapaVerify);

module.exports = router;
