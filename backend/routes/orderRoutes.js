const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getOrders,
  getOrder,
  placeOrder,
  updateOrder,
  deleteOrder,
  OrderWithCustomerDetail,
} = require("../controllers/ordersController");

const { chapaInit } = require("../middleware/chapa");
const { grantAccess } = require("../middleware/rolesMiddleware");

router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);
router.post("/place-order/:cart_id", verifyToken, placeOrder);
router.put(
  "/update/:orderId",
  verifyToken,
  // grantAccess("updateOwn", "order"),
  updateOrder
);

router.get("/orders-with-detials", OrderWithCustomerDetail);

router.delete(
  "/delete/:id",
  verifyToken,
  grantAccess("deleteOwn", "order"),
  deleteOrder
);

module.exports = router;
