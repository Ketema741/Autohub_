const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cartController");

router.get("/cart", verifyToken, getCart);
router.post("/cart/add", verifyToken, addToCart);
router.put("/cart/:productId", verifyToken, updateCartItem);
router.delete("/cart/:productId", verifyToken, removeFromCart);

module.exports = router;