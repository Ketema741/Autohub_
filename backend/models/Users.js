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
    resetToken: {
      token: { type: String },
      resetTokenExpiration: { type: Date },
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
    description:{
      type:String,
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
    resetToken: {
      token: { type: String },
      resetTokenExpiration: { type: Date },
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
    serviceArea: {
      type: String,
    },
    servicesOffered: {
      type: String,
    },
    workingHours: {
      type: String,
    },
    specializations: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
    resetToken: {
      token: { type: String },
      resetTokenExpiration: { type: Date },
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
    resetToken: {
      token: { type: String },
      resetTokenExpiration: { type: Date },
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
    education: {
      type: String,
    },
    birthday: {
      type: String,
    },
    experience: {
      type: String,
    },
    workHistory: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    licenseExpiryDate: {
      type: String,
    },
    hasCDL: {
      type: String,
    },
    references: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    additionalCertifications: {
      type: String,
    },

    ratings: {
      communication: [],
      drivingSkills: [],
      knowledgeOfRoutes: [],
      professionalism: [],
    },
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
    resetToken: {
      token: { type: String },
      resetTokenExpiration: { type: Date },
    },
  },
  { timestamps: true }
);
// Expert user schema
const CarAficionadosSchema = new mongoose.Schema(
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
    resetToken: {
      token: { type: String },
      resetTokenExpiration: { type: Date },
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
  CarAficionados: mongoose.model("CarAficionados", CarAficionadosSchema),
  TemporarySupplier: mongoose.model(
    "TemporarySupplier",
    TemporarySupplierSchema
  ),
  Driver: mongoose.model("Driver", DriverSchema),
};

module.exports = models;
