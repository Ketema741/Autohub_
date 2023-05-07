const models = require("../models/Item");
const { Supplier } = require("../models/Users");
const { Car } = require("../models/Item");
const { uploadToCloudinary } = require("../configurations/cloudinary");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await models.Category.create({ name });
    if (category) {
      res.status(201).json({
        data: category,
        message: "Category created successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addItem = async (req, res) => {
  try {
    const { categoryId, name, price, description } = req.body;
    const imageFiles = req.files;

    const imgs = imageFiles.map((img) =>
      uploadToCloudinary(img.path, "images")
    );
    const images_data = await Promise.all(imgs);
    const category = await models.Category.findById(categoryId);

    const item = await models.Item.create({
      supplier: req.user,
      category,
      name,
      price,
      description,
      itemImages: images_data,
    });
    if (item) {
      await models.Item.findByIdAndUpdate(
        { _id: item._id },
        {
          $addToSet: { itemImages: images_data },
        }
      );

      res.status(201).json({
        data: item,
        message: "Item added successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    const item = await models.Item.find({});
    if (item) {
      res.status(200).json({
        data: item,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await models.Item.findById(id);
    if (item) {
      res.status(200).json({
        data: item,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await models.Item.findById(id);
    if (!item) {
      res.status(400);
      throw new Error("Item couldn't be found");
    }
    // Get the current Login user
    const user = await Supplier.findById(req.user);

    if (!user) {
      res.status(401)
      throw new Error("Unauthorized");
    }
    if (item.supplier.toString() !== user.id) {
      res.status(403);
      throw new Error("Unauthorized!, Only item owner can update ");
    }
    const updatedItem = await models.Item.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedItem) {
      res.status(200).json({
        data: updatedItem,
        message: "Item updated successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await models.Item.findByIdAndDelete(id);
    if (item) {
      res.status(200).json({
        message: "Item deleted successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Car Item

const createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "That car couldn't be founded" });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ error: "That car couldn't be founded" });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "That car couldn't be founded" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  addItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,

  getCar,
  getAllCars,
  createCar,
  updateCar,
  deleteCar,

};
