const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const supplierAuth = require('../middleware/supplierAuth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Supplier = require('../models/Supplier');



// @route    GET api/auth
// @desc     Get logged supplier
// @access   Private
router.get('/', supplierAuth, async (req, res) => {
	try {
		const supplier = await Supplier.findById(req.supplier.id).select('-password');
		res.json(supplier); 

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}); 


// @route     POST api/auth
// @desc      Auth supplier & get token
// @access    Public
router.post(
	'/',
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Password is required').exists(),
	async (req, res) => {
	  const errors = validationResult(req);
	  if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
  
	  const { email, password } = req.body;
  
	  try {

		let supplier = await Supplier.findOne({ email });
		
		if (!supplier) {
		  return res.status(400).json({ msg: 'Invalid Credentials' });
		}
  
		const isMatch = await bcrypt.compare(password, supplier.password);
  
		if (!isMatch) {
		  return res.status(400).json({ msg: 'Invalid Credentials' });
		}
  
		const payload = {
		  supplier: {
			id: supplier.id
		  }
		};
  
		jwt.sign(
		  payload,
		  config.get('jwtSecret'),
		  {
			expiresIn: 36000
		  },
		  (err, token) => {
			if (err) throw err;
			res.json({ token });
		  }
		);
	  } catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	  }
	}   
);




module.exports = router;