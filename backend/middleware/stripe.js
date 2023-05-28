require("dotenv").config();
const axios = require("axios");

const { Order } = require("../models/Order");

const stripe = require("stripe")(process.env.SECRET_KEY);

// const checkout = async (req, res, next) => {
//   try {
//     const { orderId } = req.params;
//     const order = await Order.findById(orderId);
//     if (!order) {
//       res.status(404);
//       throw new Error("That order doesn't exist");
//     }
//     const items = order.items;
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: items.map((item) => {
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: item.name,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
//       cancel_url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
//     });
//     if (session) {
//       order
//         .updateOne({ paymentId: session.id }, { where: { id: orderId } })
//         .then(() => {
//           res.status(200).json({ url: session.url });
//         });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const chapaInit = async (req, res) => {
  try {
    const {
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    } = req.body;

    const body = JSON.stringify({
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
    });
    console.log(process.env.CHAPA_SECRET_KEY);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
    };

    const respone = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      body,
      { headers }
    );
    const data = await respone.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  chapaInit,
};
