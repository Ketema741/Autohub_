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
  getAllUnPaidOrders,
} = require("../controllers/ordersController");

const { grantAccess } = require("../middleware/rolesMiddleware");

router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);
router.post("/place-order/:cart_id", verifyToken, placeOrder);
router.put(
  "/update/:orderId",
  verifyToken,
  grantAccess("updateOwn", "order"),
  updateOrder
);

router.get("/unpaid/all", getAllUnPaidOrders);
router.get("/orders-with-detials", OrderWithCustomerDetail);

router.delete(
  "/delete/:id",
  verifyToken,
  grantAccess("deleteOwn", "order"),
  deleteOrder
);

module.exports = router;
