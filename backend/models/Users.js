const mongoose = require("mongoose");

// System Administrator schema
const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },

    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

// Supplier user schema
const SupplierSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    accountId: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },

    supplierImage: {
      type: [Object],
      default: [],
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

// Service Provider user schema
const ServiceProviderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },
    vendorName: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

// Driver user schema
const DriverSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },

    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
    types: {
      type: String,
    },
    education: { type: String },
    birthday: { type: String },
    experience: { type: String },
    workHistory: { type: String },
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DriverRating",
      },
    ],
  },
  { timestamps: true }
);

// Customer or Regular user schema
const CustomerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);
// Expert user schema
const CarAficionadosUser = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },

    profileImage: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// temporarySupplierSchema user schema
const TemporarySupplierSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    accountId: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },

    supplierImage: {
      type: [Object],
      default: [],
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const models = {
  Admin: mongoose.model("Admin", AdminSchema),
  Customer: mongoose.model("Customer", CustomerSchema),
  ServiceProvider: mongoose.model("ServiceProvider", ServiceProviderSchema),
  Supplier: mongoose.model("Supplier", SupplierSchema),
  Expert: mongoose.model("CarAficionadosUser", CarAficionadosUser),
  TemporarySupplier: mongoose.model(
    "TemporarySupplier",
    TemporarySupplierSchema
  ),
  Driver: mongoose.model("Driver", DriverSchema),
};

module.exports = models;
