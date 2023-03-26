const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");

const supplierAuth = require("../middleware/supplierAuth");

const cloudinary = require("cloudinary");
const Item = require("../models/item");

// @route     GET api/items
// @desc      Get all items
// @access    Public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({
      date: -1, 
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/items/supplieritems
// @desc      Get supplier items
// @access    Private
router.get("/supplieritems", supplierAuth, async (req, res) => {
  try {
    const items = await Item.find({ supplier: req.supplier.id }).sort({
      date: -1,
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/auth
// @desc     Get single item
// @access   Public
router.get("/:id", async (req, res) => {
  try { 
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: req.params.id });
    res.json(item);
  } catch (err) { 
    console.error(err.message);
    res.status(500).send("Server Error");
  } 
});

// @route     POST api/items
// @desc      Add new items
// @access    Private
router.post( 
  "/",
  supplierAuth,
  check("title", "title is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      location,
      area,
      bed,
      bath, 
      price,
      propertyType,
      garage,
      yearBuilt,
      itemImages,
      type,
    } = req.body;

    try {
      const newItem = new Item({
        title,
        description,
        location,
        area,
        bed,
        bath,
        price,
        propertyType,
        garage,
        yearBuilt,
        itemImages,
        type,
        supplier: req.supplier.id,
      });
      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/item/:id
// @desc      Update item
// @access    Private
router.put("/:id", supplierAuth, async (req, res) => {
  const {
    title,
    description,
    location,
    area,
    bed,
    bath,
    price,
    propertyType,
    garage,
    yearBuilt,
    Neighborhood,
    type,
  } = req.body;

  // Build item object
  const itemFields = {};
  if (title) itemFields.title = title;
  if (description) itemFields.description = description;
  if (location) itemFields.location = location;
  if (area) itemFields.area = area;
  if (bed) itemFields.bed = bed;
  if (bath) itemFields.bath = bath;
  if (price) itemFields.price = price;
  if (propertyType) itemFields.propertyType = propertyType;
  if (garage) itemFields.garage = garage;
  if (yearBuilt) itemFields.yearBuilt = yearBuilt;
  if (Neighborhood) itemFields.Neighborhood = Neighborhood;
  if (type) itemFields.type = type;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "item not found" });

    // Make sure supplier owns the item
    if (item.supplier.toString() !== req.supplier.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/item/:id
// @desc      Delete item
// @access    Private
router.delete("/:id", supplierAuth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "item not found" });

    // Make sure supplier owns item
    if (item.supplier.toString() !== req.supplier.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const { itemImages } = item
    deleteImage(itemImages)    
   
    await item.findByIdAndRemove(req.params.id);
    res.json({ msg: "item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); 
 
const deleteImage = async(itemImages) => {
  if(itemImages.length >= 1) {
    for (const image of itemImages) {
      const res = await cloudinary.uploader.destroy(image.public_id);
      console.log(res)
    }
  }
}

cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_key"),
  api_secret: config.get("api_secret"),
});
 

router.post("/image", async (req, res) => {
  const { public_id } = req.body;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(400).send("server Error");
  }
}); 
  
module.exports = router; 