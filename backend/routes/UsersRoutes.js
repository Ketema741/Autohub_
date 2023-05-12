const express = require("express");
const router = express.Router();

const {
  signUpUser,
  signInUser,
  getCustomer,
  getDrivers,
  getServiceProviders,
  getUsers,
  updateCustomer,
  deleteCustomer,
  getUser,
} = require("../controllers/usersController");

const { verifyToken, verifyAdministrator } = require("../middleware/auth");
const { grantAccess } = require("../middleware/rolesMiddleware");
const {
  transferAmountToSupplierAccount,
} = require("../configurations/Admin/transfer");
const {
  getPendingSuppliers,
  approveSupplier,
  rejectSupplier,
} = require("../configurations/Admin/approvals");

router.post("/register", signUpUser);
router.post("/login", signInUser);
router.post("/user", getUser)

router.put(
  "/update/customer/:user_id",
  verifyToken,
  grantAccess("updateOwn", "profile"),
  updateCustomer
);
router.delete("/delete/customer/:user_id", deleteCustomer);

router
  .post("/customers", getCustomer)
  .get("/drivers", getDrivers)
  .get("/service-providers", getServiceProviders)
  .get("/suppliers", getUsers);

// Admin only routes
router.get("/pending/suppliers", verifyAdministrator, getPendingSuppliers);
router.post(
  "/approve/suppliers/:supplierId",
  verifyAdministrator,
  approveSupplier
);
router.delete(
  "/reject/suppliers/:supplierId",
  verifyAdministrator,
  rejectSupplier
);
router.post("/transfer/suppliers/:orderId", transferAmountToSupplierAccount);

module.exports = router;
