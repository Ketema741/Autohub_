require("dotenv").config();
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.SECRET_KEY);
const { Order } = require("../../models/Order");

const calculateAmounts = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items");
    const itemsBySupplier = order.items.reduce((acc, item) => {
      const supplierId = item.supplier.toString();
      acc[supplierId] = acc[supplierId] || [];
      acc[supplierId].push(item);

      return acc;
    }, {});

    // Calculate the total amount for each supplier
    const amounts = {};

    for (const supplierId in itemsBySupplier) {
      const supplierItems = itemsBySupplier[supplierId];

      const totalAmount = supplierItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      amounts[supplierId] = totalAmount;
    }
    return amounts;
  } catch (err) {
    console.error(err);
  }
};

const transferAmountToSupplierAccount = async (req, res) => {
  const { orderId } = req.params;
  try {
    const amounts = await calculateAmounts(orderId);

    const order = await Order.findById(orderId).populate({
      path: "items",
      populate: {
        path: "supplier",
        model: "Supplier",
        select: "-password",
      },
    });

    for (const supplierId in amounts) {
      const amount = amounts[supplierId];
      const itemSupplier = order.items.find((item) => item.supplier);
      const accountId = itemSupplier.supplier.accountId;

      // Transfer the amount to the supplier's account using Stripe API
      const transfer = await stripe.transfers.create({
        amount,
        currency: "usd",
        destination: "acct_1My9mmLm6q64Ud3c",
      });

      res.status(200).json({
        message: `Transfer for ${amount} successfully created: ${transfer.id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  transferAmountToSupplierAccount,
};
