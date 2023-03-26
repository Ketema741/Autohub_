const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	supplier: {
		type: Schema.Types.ObjectId,
		ref: 'supplier'
	},
	type: { 
		type: String,
		default: "rent"
	},
	itemImages: {
		type: [Object],
		required: true
	},
	title: { 
		type: String,
		required: true
	},
	description: {
		type: String
	},
	location: {
		type: String,
		required: true
	}, 
	area: {
		type: Number,
		required: true
	},
	bed: {
		type: Number,
		required: true
	},
	bath: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	propertyType: {
		type: String,
	},
	garage: {
		type: String,
	},
	yearBuilt: {
		type: Date,
		required: true
	},
	Neighborhood: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('item', ContactSchema); 