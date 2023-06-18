require("dotenv").config();
const { Order } = require("../../models/Order");
const { Transaction } = require("../../models/Transactions");

const calculateAmounts = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items");
    if (!order) {
      throw new Error("Order not found");
    }
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
    console.log(amounts)
    return amounts;
  } catch (err) {
    console.error(err);
  }
};

const saveTransaction = async (req, res) => {
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

      console.log(amount, itemSupplier);
      // if (transaction) {
      //   await transaction.save();
      //    res.status(200).json({
      //      message: "Transaction saved successfully",
      //    });
      // } else {
      //   throw new Error("Oops, sorry Transaction couldn't be saved");
      // }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveTransaction,
};
