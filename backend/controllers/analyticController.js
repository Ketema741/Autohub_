const { Sales } = require("../models/Analytics");
const { Customer } = require("../models/Users");

const getDailySales = async (req, res) => {
  try {
    const revenue = await Sales.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
          totalRevenue: { $sum: "$totalRevenue" },
        },
      },
    ]);
    res.status(200).json(revenue);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const saveSale = async (saleDate, totalRevenue) => {
  const sale = new Sales({
    saleDate,
    totalRevenue,
  });

  try {
    await sale.save();
    console.log("Sale saved successfully");
  } catch (err) {
    console.error(err);
  }
};

const customerLocation = async (req, res) => {
  try {
    const customerByLocation = await Customer.aggregate([
      {
        $group: {
          _id: "$address",
          count: { $sum: 1 },
          customers: {
            $push: {
              firstName: "$firstName",
              lastName: "$lastName",
              email: "$email",
            },
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);
    res.status(200).json({ addresses: customerByLocation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDailySales,
  saveSale,
  customerLocation,
};
