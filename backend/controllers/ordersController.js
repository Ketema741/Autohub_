const models = require("../models/Order");
const Cart = require("../models/Cart");

const generateUniqueRandomString = require("../utils/random");

const { saveSale } = require("./analyticController");

const getOrders = async (req, res) => {
  try {
    const orders = await models.Order.find({})
      .populate({
        path: "items",
        populate: [
          {
            path: "supplier",
            model: "Supplier",
            select: "-password",
          },
          {
            path: "owner",
            model: "Customer",
            select: "-password",
          },
          {
            path: "itemId",
            model: "Item",
          },
        ],
      })
      .populate("owner", "-password");

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//  placing order controller
const placeOrder = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const cart = await Cart.findById(cart_id);
    if (!cart) {
      throw new Error("That cart doesn't exist");
    }

    const prices = [];
    cart.items.forEach((item) => prices.push(item.price * item.quantity));
    total_price = prices.reduce((a, b) => a + b);

    const _order = await models.Order.create({
      orderNumber: generateUniqueRandomString(12),
      owner: req.user.id,
      items: cart.items,
      totalAmount: total_price,
    });
    if (_order) {
      const order = await models.Order.findById(_order._id).populate({
        path: "items",
        populate: {
          path: "supplier",
        },
      });
      res.status(201).json({
        order: order,
        message: "Order placed successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  get all the items in an order
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await models.Order.findById(id).populate({
      path: "items",
      populate: {
        path: "supplier",
        model: "Supplier",
      },
    });
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await models.Order.findById(orderId);
    if (!order) {
      res.status(404);
      throw new Error("That order doesn't exist");
    }
    console.log(order);
    await saveSale(new Date(), order.totalAmount);

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await models.Order.findById(orderId);
    if (!order) {
      res.status(404);
      throw new Error("That order doesn't exist");
    }
    res.status(200).json({ order, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const OrderWithCustomerDetail = async (req, res) => {
  try {
    const orders = await models.Order.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "owner",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $project: {
          orderNumber: 1,
          totalAmount: 1,
          "customer.name": 1,
          "customer.email": 1,
          "customer.address": 1,
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUnPaidOrders = async (req, res) => {
  try {
    const unPaidOrders = await models.Order.find({ isPaid: false }).populate(
      "owner"
    );
    res.status(200).json(unPaidOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  placeOrder,
  updateOrder,
  deleteOrder,

  OrderWithCustomerDetail,
  getAllUnPaidOrders,
};
