const express = require("express");
const router = express.Router();

const {
  signUpUser,
  signInUser,
  getCustomers,
  getDrivers,
  getServiceProviders,
  getSuppliers,
  getCarAficionados,
  updateCustomer,
  deleteCustomer,
  getUser,
  deleteDriver,
  deleteSupplier,
  deleteServiceProvider,
  deleteCarAficionados,
  updateSupplier,
  updateServiceProvider,
  updateDriver,
  updateCarAficionados,
  getDriver,
  getServiceProvider,
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

// Auth
router.post("/register", signUpUser);
router.post("/login", signInUser);
router.get("/user", getUser);

router.get("/service-provider/:user_id", verifyToken, getServiceProvider);
//  updates
router.put(
  "/update/customer/:user_id",
  verifyToken,
  grantAccess("updateOwn", "profile"),
  updateCustomer
);
router.put(
  "/update/supplier/:user_id",
  verifyToken,
  grantAccess("updateOwn", "profile"),
  updateSupplier
);
router.put(
  "/update/service-provider/:user_id",
  verifyToken,
  grantAccess("updateOwn", "profile"),
  updateServiceProvider
);
router.put(
  "/update/driver/:user_id",
  verifyToken,
  grantAccess("updateOwn", "profile"),
  updateDriver
);
router.put(
  "/update/aficionados/:user_id",
  verifyToken,
  grantAccess("updateOwn", "profile"),
  updateCarAficionados
);

// Delete
router.delete(
  "/delete/customer/:user_id",
  verifyToken,
  verifyAdministrator,
  deleteCustomer
);
router.delete(
  "/delete/driver/:user_id",
  verifyToken,
  verifyAdministrator,
  deleteDriver
);
router.delete(
  "/delete/supplier/:user_id",
  verifyToken,
  verifyAdministrator,
  deleteSupplier
);
router.delete(
  "/delete/services_provider/:user_id",
  verifyToken,
  verifyAdministrator,
  deleteServiceProvider
);
router.delete(
  "/delete/aficionados/:user_id",
  verifyToken,
  verifyAdministrator,
  deleteCarAficionados
);

// Querying
router
  .get("/customers", getCustomers)
  .get("/drivers", getDrivers)
  .get("/service-providers", getServiceProviders)
  .get("/suppliers", getSuppliers)
  .get("/aficionados", getCarAficionados)
  .get("/driver/:id", getDriver);

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
