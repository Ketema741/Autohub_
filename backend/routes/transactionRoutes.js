const express = require("express");
const router = express.Router();

const { getTransactions } = require("../configurations/Admin/transactions");

router.get("/get", verifyAdministrator, getTransactions);

module.exports = router;
