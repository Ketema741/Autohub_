require("dotenv").config();
const { Order } = require("../../models/Order");
const { Supplier } = require("../../models/Users");
const { Transaction } = require("../../models/Transactions");

const calculateAmounts = async (orderId) => {
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
      acc[supplierId] = acc[supplierId] || [];
      acc[supplierId].push(item);

      return acc;
    }, {});

    const amounts = Object.keys(itemsBySupplier).reduce((acc, supplierId) => {
      const supplierItems = itemsBySupplier[supplierId];

      if (!supplierItems || !supplierItems.length) {
        throw new Error(`No items found for supplier ${supplierId}`);
      }

      const totalAmount = supplierItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0
      );
      acc[supplierId] = totalAmount;

      return acc;
    }, {});

    return amounts;
  } catch (err) {
    throw new Error(`Error calculating amounts: ${err.message}`);
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

    const transactions = await Promise.all(
      Object.keys(amounts).map(async (supplierId) => {
        const amount = amounts[supplierId];
        const supplierItems = order.items.filter(
          (item) => item.supplier && item.supplier.equals(supplierId)
        );

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
          throw new Error(`Supplier not found with ID: ${supplierId}`);
        }

        const itemIds = supplierItems.map((item) => item._id);

        const transaction = await Transaction.create({
          supplier: supplierId,
          revenue: amount,
          totalItemsSold: itemIds.length,
          itemsSold: itemIds,
        });

        if (!transaction) {
          throw new Error("Oops, sorry. Transaction couldn't be saved.");
        }

        return transaction;
      })
    );

    res.status(200).json({
      message: "Transactions saved successfully",
      transactions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  saveTransaction,
};
