require("dotenv").config();
const mongoose = require("mongoose");
const { Order } = require("../../models/Order");
const { Transaction } = require("../../models/Transactions");
const calculateAmounts = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items");
    const itemsBySupplier = order.items.reduce((acc, item) => {
      if (item.supplier) {
        const supplierId = item.supplier.toString();
        acc[supplierId] = acc[supplierId] || [];
        acc[supplierId].push(item);
      }
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

const saveTransaction = async (orderId) => {
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

      const transaction = new Transaction({
        supplier: itemSupplier.supplier,
        revenue: amount,
        totalItemsSold: order.items.length,
        ItemsSold: order.items.map((item) => item.itemId),
      });
      if (transaction) {
        await transaction.save();
      } else {
        throw new Error("Oops, sorry Transaction couldn't be saved");
      }
    }

    return { message: "Transaction saved successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveTransaction,
};
