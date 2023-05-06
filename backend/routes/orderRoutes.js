const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getOrders,
  getOrder,
  placeOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");

const { grantAccess } = require("../middleware/rolesMiddleware");
const { checkout } = require("../middleware/stripe");

router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);
router.post("/place-order", verifyToken, placeOrder);
router.put(
  "/update/:orderId",
  verifyToken,
  // checkout,
  grantAccess("updateOwn", "order"),
  updateOrder
);
router.delete(
  "/delete/:id",
  verifyToken,
  grantAccess("deleteOwn", "order"),
  deleteOrder
);

module.exports = router;