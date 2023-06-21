require("dotenv").config();
const mongoose = require("mongoose");
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
    const supplier = await Supplier.findById(supplierId)
      .populate("firstName lastName email phone supplierImage role bio")
      .select("-password");

    if (!supplier) {
      return res.status(404).json({
        message: `No supplier found with ID: ${supplierId}`,
        supplierId,
      });
    }

    if (supplier._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message:
          "Access denied! Only the owner or administrator can access the revenue.",
        supplierId,
      });
    }

    const totalRevenue = await Transaction.aggregate([
      {
        $match: {
          supplier: mongoose.Types.ObjectId.createFromHexString(supplierId),
        },
      },
      {
        $group: {
          _id: "$supplier",
          totalRevenue: { $sum: "$amount" },
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

    const transactions = await Transaction.find({
      supplier: supplierId,
    }).populate("itemsSold");

    const itemsSold = transactions.reduce((acc, transaction) => {
      return acc.concat(transaction.itemsSold);
    }, []);

    res.status(200).json({
      message: "Total revenue calculated successfully",
      supplierId,
      supplier,
      totalRevenue: totalRevenue[0].totalRevenue,
      itemsSold,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).populate("supplier");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  saveTransaction,
  sumRevenueForSupplier,
  getTransactions,
};
