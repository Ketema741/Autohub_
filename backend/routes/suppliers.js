const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const config = require('config');
require("dotenv").config();

const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator')

const supplierAuth = require("../middleware/supplierAuth");
const Supplier = require('../models/Supplier')
const cloudinary = require("cloudinary");



// @route     GET api/suppliers
// @desc      Get all suppliers
// @access    Public
router.get("/", async (req, res) => {
    try {
      const suppliers = await Supplier.find().sort({
        date: -1, 
      });
      res.json(suppliers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
});


// @route    GET api/suppliers
// @desc     Get single supplier
// @access   Public
router.get("/:id", async (req, res) => {
    try { 
      let supplier = await Supplier.findById(req.params.id);
      if (!supplier) return res.status(404).json({ msg: req.params.id });
      res.json(supplier);
    } catch (err) { 
      console.error(err.message);
      res.status(500).send("Server Error");
    } 
});


// @route       POST api/suppliers
// @desc        register a supplier
// @access      public
router.post(
    '/',
    [
        check("name", "please add name").not().isEmpty(),
        check("email", "please include a valid email!").isEmail(),
        check("password", "please enter a password with 6 or more characters")
        .isLength({min:6}),
        check("phone", "please add phone and phone can not be greater than 10 diigit")
            .not()
            .isEmpty()
            .isLength({min:10}),
        
    ],
    async (req, res) => { 
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		} 

      const { 
        name, 
        email, 
        password, 
        phone,
        description,
        experienceYear,
        location,
        specializations,
        activityRange,
        supplierImage,
      } = req.body;

		try {
			let supplier = await Supplier.findOne({ email: email });

			if (supplier) {
				return res.status(400).json({ msg: 'supplier already exists' });
			}

			supplier = new Supplier({
				name,
				email,
				password,
				phone,
        description,
        experienceYear,
        location,
        specializations,
        activityRange,
        supplierImage
			});

			const salt = await bcrypt.genSalt(10);

			supplier.password = await bcrypt.hash(password, salt);

			await supplier.save();

            const payload = {
				supplier: {
					id: supplier.id
				}
			};

			jwt.sign(
				payload,
				process.env.SECRET_JWT,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
			
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
    }
);

    // @route     PUT api/item/:id
    // @desc      Update item
    // @access    Private
    router.put("/:id", supplierAuth, async (req, res) => {
        const {
          _id,
          name, 
          email, 
          password, 
          phone,
          description,
          experienceYear,
          location,
          specializations,
          activityRange,
        } = req.body;
    
        // Build supplier object
        const supplierFields = {};
        if (name) supplierFields.name = name;
        if (email) supplierFields.email = email;
        if (password) supplierFields.password = password;
        if (phone) supplierFields.phone = phone;
        if (description) supplierFields.description = description;
        if (experienceYear) supplierFields.experienceYear = experienceYear;
        if (location) supplierFields.location = location;
        if (specializations) supplierFields.specializations = specializations;
        if (activityRange) supplierFields.activityRange = activityRange;
    
        try {
        let supplier = await Supplier.findById(req.params.id);
    
        if (!supplier) return res.status(404).json({ msg: "supplier not found" });
    
        supplier = await Supplier.findByIdAndUpdate(
            _id,
            { $set: supplierFields }, 
            { new: true }
        );
    
        res.json(supplier);
        } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        }
    });


  router.put("/favourite/:id", async (req, res) => {
    try {
      
      let supplier = await Supplier.findOneAndUpdate (
        { _id: req.params.id},
        { $addToSet: { favourites: req.body  } }
      ) 

      supplier = await supplier.save()
      res.json(supplier);

    } catch (err) {
      console.error(err.message); 
      res.status(500).send("Server Error");
    }
  });
 

  router.put("/removefavourite/:id", async (req, res) => {
    try {
      
      let supplier = await Supplier.updateOne (
        { _id: req.params.id }, 
        { $pull: { favourites: { itemId: req.body.favouriteId } } }
      )
      
      res.json(supplier);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }     
  })

  
  // @route     DELETE api/suppliers/:id
  // @desc      Delete supplier
  // @access    Private
  router.delete("/:id", supplierAuth, async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
  
      if (!supplier) return res.status(404).json({ msg: "supplier not found" });
      await supplier.findByIdAndRemove(req.params.id);
  
      res.json({ msg: "supplier removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  

  cloudinary.config({
    cloud_name: process.env.CLOUND_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
  
  router.post("/image", async (req, res) => {
    const { public_id } = req.body;
    try {
      await cloudinary.uploader.destroy(public_id);
      res.json({ msg: "Image removed" });
    } catch (err) {
      console.error(err.message);
      res.status(400).send("server Error");
    } 
  });


module.exports = router;