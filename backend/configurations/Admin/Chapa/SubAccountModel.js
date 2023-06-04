const mongoose = require("mongoose");

const SubAccountSchema = new mongoose.Schema({
  SubAccount_id: {
    type: String,
    required: true,
  },
  business_name: {
    type: String,
    required: true,
  },
  account_name: {
    type: String,
    required: true,
  },
  bank_code: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
  split_value: {
    type: Number,
    required: true,
  },
  split_type: {
    type: String,
    required: true,
  },
});

const SubAccount = mongoose.model("SubAccount", SubAccountSchema);

module.exports = SubAccount;
