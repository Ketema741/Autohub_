const Cart = require("../models/Cart");
const { Item } = require("../models/Item");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.itemId.toString() === productId
    );

    if (existingItem) {
      // If product is already in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      const product = await Item.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product couldn't be found" });
      }
      cart.items.push({
        itemId: productId,
        quantity,
        price: product.price,
        supplierId: product.supplier,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate("items.itemId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getCartById = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const cart = await Cart.findById(cart_id);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItem = cart.items.find(
      (item) => item.itemId.toString() === productId
    );

    if (!existingItem) {
      return res
        .status(404)
        .json({ error: "Product couldn't be found in cart" });
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      (item) => item.itemId.toString() !== productId
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const existingItem = cart.items.find(
      (item) => item.itemId.toString() === productId
    );

    if (!existingItem) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Update item quantity
    existingItem.quantity = req.body?.quantity || 1;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
