const express = require("express");
const router = express.Router();

const {
  addCategory,
  addItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  createCar,
  getAllCars,
  getCar,
  updateCar,
  deleteCar,
} = require("../controllers/itemsController");
const { verifyToken } = require("../middleware/auth");
const { upload } = require("../configurations/multer");
const { grantAccess } = require("../middleware/rolesMiddleware");

router.get("/", getItems).get("/:id", getItem);
router.put(
  "/update/:id",
  verifyToken,
  grantAccess("updateOwn", "item"),
  updateItem
);
router.delete(
  "/delete/:id",
  verifyToken,
  grantAccess("deleteOwn", "item"),
  deleteItem
);
router.post("/create-category", verifyToken, grantAccess("createAny", "category"), addCategory);
router.post(
  "/add-item",
  verifyToken,
  grantAccess("createOwn", "item"),
  upload.array("itemImages", 6),
  addItem
);

// car
router.get("/car/:id", getCar);
router.get("/cars/:id", getAllCars);
router.post("/cars/add", createCar);
router.put("/cars/update/:id", updateCar);
router.delete("/cars/delete/:id", deleteCar);

module.exports = router;