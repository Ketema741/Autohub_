const { Item, Category, Car } = require("../models/Item");
const { Supplier } = require("../models/Users");

const { uploadToCloudinary } = require("../configurations/cloudinary");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });
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

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
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
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404);
      throw new Error(
        "No such a category! please add it before assigning item to item"
      );
    }

    const item = await Item.create({
      supplier: req.user._id,
      category,
      name,
      price,
      description,
      itemImages: images_data,
    });
    if (item) {
      await Item.findByIdAndUpdate(
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
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    const item = await Item.find({});
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
    const item = await Item.findById(id);
    if (item) {
      const relatedItems = await getRelatedProducts(item._id);
      res.status(200).json({
        data: item,
        relatedItems,
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
    const item = await Item.findById(id);
    if (!item) {
      res.status(400);
      throw new Error("Item couldn't be found");
    }
    // Get the current Login user
    const user = await Supplier.findById(req.user);

    if (!user) {
      res.status(401);
      res.status(401);
      throw new Error("Unauthorized");
    }
    if (item.supplier.toString() !== user.id) {
      res.status(403);
      throw new Error("Unauthorized!, Only item owner can update ");
    }
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
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
    const item = await Item.findByIdAndDelete(id);
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

// Tag to an item
const assignTagsToProduct = async (req, res) => {
  const { itemId, tags } = req.body;
  try {
    const product = await Item.findById(itemId);
    if (!product) {
      return res.status(404).json({ error: "Item not found" });
    }
    product.tags = tags;
    await product.save();

    return res
      .status(200)
      .json({ message: "Tags assigned to product successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//  querying related products
const getRelatedProducts = async (itemId) => {
  try {
    const currentProduct = await Item.findById(itemId);
    const { category, tags } = currentProduct;

    const relatedProducts = await Item.aggregate([
      {
        $match: {
          $or: [{ category }, { tags: { $in: tags } }],
          _id: { $ne: itemId }, // Exclude the current product from results
        },
      },
      {
        $limit: 5,
      },
    ]);

    return relatedProducts;
  } catch (error) {
    throw new Error("Failed to get related products");
  }
};

// Car Item
const createCar = async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      price,
      description,
      engine,
      fuelType,
      isAvailable,
      seatingCapacity,
    } = req.body;

    const imageFiles = req.files;
    console.log(req.body);
    if (
      !make ||
      !model ||
      !year ||
      !price ||
      !description ||
      !engine ||
      !fuelType ||
      !seatingCapacity
    ) {
      res.status(400);
      throw new Error("Please add all the required fields");
    }
    const action = imageFiles.map((img) =>
      uploadToCloudinary(img.path, "images")
    );
    const images_data = await Promise.all(action);
    const car = await Car.create({
      supplier: req.user._id,
      make,
      model,
      price,
      year,
      description,
      seatingCapacity,
      engine,
      fuelType,
      isAvailable,
      carImages: images_data,
    });
    if (car) {
      const _car = await Car.findByIdAndUpdate(
        { _id: car._id },
        {
          $addToSet: { carImages: images_data },
        },
        { new: true }
      );
      res.status(201).json({
        data: _car,
        message: "Car added successfully",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "That car couldn't be found" });
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
      return res.status(404).json({ error: "That car couldn't be found" });
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
      return res.status(404).json({ error: "That car couldn't be found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    if (cars) {
      res.status(200).json({
        data: cars,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
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
  assignTagsToProduct,
  getRelatedProducts,
};
