require("dotenv").config();
const { Order } = require("../../models/Order");
const { Supplier } = require("../../models/Users");
const { Transaction } = require("../../models/Transactions");

const splitItemsBasedOnSupplier = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items");
    if (!order) {
      throw new Error("Order not found");
    }

    if (!order.items || !order.items.length) {
      throw new Error("No items found in order");
    }

    const itemsBySupplier = order.items.reduce((acc, item) => {
      const supplierId = item.supplierId.toString();
      acc[supplierId] = acc[supplierId] || { totalAmount: 0, totalItems: 0 };
      acc[supplierId].totalAmount += (item.price || 0) * (item.quantity || 0);
      acc[supplierId].totalItems += item.quantity || 0;

      return acc;
    }, {});
    console.log(itemsBySupplier);

    return itemsBySupplier;
  } catch (err) {
    throw new Error(`Error calculating amounts: ${err.message}`);
  }
};

const saveTransaction = async (req, res) => {
  const { orderId } = req.params;
  try {
    const amounts = await splitItemsBasedOnSupplier(orderId);

    const order = await Order.findById(orderId).populate("items");

    const transactions = await Promise.all(
      Object.keys(amounts).map(async (supplierId) => {
        const amount = amounts[supplierId].totalAmount;
        const totalItems = amounts[supplierId].totalItems;

        const supplier = await Supplier.findById(supplierId).select("name");
        if (!supplier) {
          throw new Error(`Supplier not found with ID: ${supplierId}`);
        }

        const itemsSold = order.items
          .filter((item) => item.supplierId.toString() === supplierId)
          .map((item) => item._id);

        const transaction = await Transaction.create({
          supplier: supplier._id,
          orderId,
          amount,
          totalItems,
          itemsSold,
        });

        if (!transaction) {
          throw new Error("Transaction couldn't be saved.");
        }

        return transaction;
      })
    );

    res.status(200).json({
      message: "Transactions saved successfully",
      transactions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const sumRevenueForSupplier = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const supplier = await Supplier.findById(supplierId);

    if (supplier._id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Only account owner can access revenue");
    }
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error(
        "Access denied! You're couldn't access the revenue, only Owner or Administrator"
      );
    }
    const totalRevenue = await Transaction.aggregate([
      {
        $match: { supplier: supplierId },
      },
      {
        $group: {
          _id: "$supplier",
          totalRevenue: { $sum: "$revenue" },
        },
      },
    ]);

    if (!totalRevenue || totalRevenue.length === 0) {
      return res.status(200).json({
        message: `No revenue found for supplier with ID: ${supplierId}`,
        supplierId,
        totalRevenue: 0,
      });
    }

    res.status(200).json({
      message: "Total revenue calculated successfully",
      supplierId,
      totalRevenue: totalRevenue[0].totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveTransaction,
  sumRevenueForSupplier,
};
