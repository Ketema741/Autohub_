const mongoose = require ('mongoose')

const UserSchema = mongoose.Schema ({
    type: {
        type:String,
        default:"user"
    },
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    phone: { 
        type:String,
        required:true
    },
    description: {
        type: String,
    },
    experienceYear: {
        type:Number,

    },
    location: {
        type: String,
 
    },
    specializations: {
        type:String,
  
    },
    activityRange: {
        type: Number, 
        default: null
    },
    forSale: {
        type: Number,
        default: null
    },
    sold: {
        type: Number,
        default: null
    },
    favourites: {
        type: [Object],
        default:[]
    },
    supplierImage: {
		type: [Object],
        default:[]
	},
    date: {
        type: Date,
       default: Date.now
    },
})

module.exports = mongoose.model('supplier', UserSchema);
