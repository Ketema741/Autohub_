const axios = require("axios");
const SubAccount = require("./SubAccountModel")

const createSubAccount = async (req, res) => {
  try {
    const {
      business_name,
      account_name,
      bank_code,
      account_number,
      split_value,
      split_type,
    } = req.body;

    const response = await axios.post(
      "https://api.chapa.co/v1/subaccount",
      {
        business_name,
        account_name,
        bank_code,
        account_number,
        split_value,
        split_type,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const subaccount = new SubAccount({
      business_name,
      account_name,
      bank_code,
      account_number,
      split_value,
      split_type,
      subaccount_id: response.data.data.subaccount_id, // Save the subaccount_id to the database
    });

    await subaccount.save();
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating subaccount" });
  }
};
