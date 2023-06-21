require("dotenv").config();
const axios = require("axios");
const generateUniqueRandomString = require("../utils/random");
const { Order } = require("../models/Order");
const { Item } = require("../models/Item");
const { SaleRecord } = require("../models/Analytics");

const chapaInit = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404);
      throw new Error("That order doesn't exist");
    }
    const { amount, currency, email, first_name, last_name, phone_number } =
      req.body;
    const tx_ref = generateUniqueRandomString(18);
    const body = JSON.stringify({
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
    };

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      { headers }
    );
    const data = await response.data;
    if (data.status === "success") {
      await Order.updateOne({ _id: orderId }, { paymentId: tx_ref });
      for (const item of order.items) {
        const updatedItem = await Item.findByIdAndUpdate(item.productId, {
          $inc: { quantity: -item.quantity },
          $set: { isAvailable: item.quantity < 1 ? false : true },
        });
      }
    }
    res.status(200).json({ payment_status_data: data, order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

//  Verification
const chapaVerify = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  console.log(orderId, order);
  if (!order) {
    return res.status(404).json({ error: "That order doesn't exist" });
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
  };
  try {
    if (!order.paymentId) {
      res.status(400);
      throw new Error({ error: "That order isn't paid yet" });
    }
    const tx_ref = order.paymentId;
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      { headers }
    );
    const verifySession = response.data;

    if (verifySession.status === "success") {
      await Order.updateOne(
        { _id: orderId },
        { paymentId: verifySession.reference, isPaid: true }
      );

      const sale_record = await SaleRecord.create({
        customerFirstName: verifySession.data.first_name,
        customerLastName: verifySession.data.last_name,
        paymentRefernce: verifySession.reference,
        paymentMetada: verifySession,
        order: order._id,
      });

      const _sale_record = await SaleRecord.findById(sale_record._id).populate(
        "order"
      );
      res.status(200).json(_sale_record);
    } else {
      res.status(400);
      throw new Error({ message: "Order is not successfully paid" });
    }
  } catch (error) {
    res.status(500).json({ error: "Couldn't verify Order payment " });
  }
};

module.exports = {
  chapaInit,
  chapaVerify,
};
