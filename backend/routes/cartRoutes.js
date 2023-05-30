const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  addToCart,
  getCart,
  getCartById,
  removeFromCart,
  updateCartItem,
} = require("../controllers/cartController");

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.get("/:cart_id", verifyToken, getCartById);
router.put("/update/:productId", verifyToken, updateCartItem);
router.delete("/remove/:productId", verifyToken, removeFromCart);

module.exports = router;
