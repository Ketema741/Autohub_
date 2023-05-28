const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models/Users");

const getUserByEmail = async (email) => {
  const [admin, customer, supplier, driver, serviceProvider] =
    await Promise.all([
      models.Customer.findOne({ email }),
      models.Admin.findOne({ email }),
      models.ServiceProvider.findOne({ email }),
      models.Driver.findOne({ email }),
      models.Supplier.findOne({ email }),
    ]);

  if (admin) {
    return admin;
  }

  if (customer) {
    return customer;
  }

  if (supplier) {
    return supplier;
  }
  if (driver) {
    return driver;
  }
  if (serviceProvider) {
    return serviceProvider;
  }

  return null;
};

const signUpUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, address, userType } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !userType ||
      !address
    ) {
      res.status(400);
      throw new Error(" Please enter all the required fields");
    }

    const userExist = await getUserByEmail(email);
    if (userExist) {
      res.status(400);
      throw new Error(" User with that email already exists");
    }
    //Hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    switch (userType) {
      case "admin":
        const admin = await models.Admin.create({
          email,
          firstName,
          lastName,
          phone,
          address,
          password: hashedPassword,
          role: "admin",
        });

        if (admin) {
          res.status(201).json({
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            phone: admin.phone,
            role: admin.role,
            token: generateToken(admin._id, admin.role),
          });
        } else {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
        break;
      case "service provider":
        const service_provider = await models.ServiceProvider.create({
          email,
          firstName,
          lastName,
          phone,
          address,
          password: hashedPassword,
          role: "service provider",
        });
        if (service_provider) {
          res.status(201).json({
            _id: service_provider._id,
            email: service_provider.email,
            firstName: service_provider.firstName,
            lastName: service_provider.lastName,

            token: generateToken(service_provider._id, service_provider.role),
          });
        } else {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
        break;
      case "supplier":
        const supplier = await models.TemporarySupplier.create({
          email,
          firstName,
          lastName,
          phone,
          address,
          password: hashedPassword,
          role: "supplier",
        });
        if (supplier) {
          res.status(201).json({
            _id: supplier._id,
            email: supplier.email,
            firstName: supplier.firstName,
            lastName: supplier.lastName,
            token: generateToken(supplier._id, supplier.role),
          });
        } else {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
        break;
      case "customer":
        const customer = await models.Customer.create({
          email,
          firstName,
          lastName,
          phone,
          address,
          password: hashedPassword,
          role: "customer",
        });
        if (customer) {
          res.status(201).json({
            _id: customer._id,
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            token: generateToken(customer._id, customer.role),
          });
        } else {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
        break;

      case "driver":
        const driver = await models.Driver.create({
          email,
          firstName,
          lastName,
          phone,
          address,
          password: hashedPassword,
          role: "driver",
          experience,
          birthday,
          education,
          workHistory,
        });
        if (driver) {
          res.status(201).json({
            _id: driver._id,
            email: driver.email,
            firstName: driver.firstName,
            lastName: driver.lastName,
            token: generateToken(driver._id, driver.role),
          });
        } else {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
      case "CarAficionadosUser":
        const carAficionadosUser = await models.CarAficionadosUser.create({
          email,
          firstName,
          lastName,
          phone,
          address,
          password: hashedPassword,
          role: "carAficionadosUser",
        });
        if (!carAficionadosUser) {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
        res.status(201).json({
          _id: carAficionadosUser._id,
          email: carAficionadosUser.email,
          firstName: carAficionadosUser.firstName,
          lastName: carAficionadosUser.lastName,
          token: generateToken(carAficionadosUser._id, carAficionadosUser.role),
        });
        break;
      default:
        res.status(400);
        throw new Error(
          "Can't register a user of that type please provide existing user type"
        );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        email,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400);
      throw new Error("Couldn't login user with these credentials");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//
const updateCustomer = async (req, res) => {
  try {
    const user = await models.Customer.findById(req.params.user_id);

    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, Customer not found ");
    }
    if (user._id !== req.user.id.toString()) {
      throw new Error("Only account owner can update the profile");
    }
    const updatedUser = await models.Customer.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      data: updatedUser,
      message: "Customer has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateServiceProvider = async (req, res) => {
  try {
    const user = await models.ServiceProvider.findById(req.params.user_id);

    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, Service Provider not found ");
    }
    if (user._id !== req.user.id.toString()) {
      throw new Error("Only account owner can update the profile");
    }
    const updatedUser = await models.ServiceProvider.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      data: updatedUser,
      message: "Customer has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const user = await models.Supplier.findById(req.params.user_id);

    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, Supplier not found ");
    }
    if (user._id !== req.user.id.toString()) {
      throw new Error("Only account owner can update the profile");
    }
    const updatedUser = await models.Supplier.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      data: updatedUser,
      message: "Supplier has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateDriver = async (req, res) => {
  try {
    const user = await models.Driver.findById(req.params.user_id);

    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, User not found ");
    }
    if (user._id !== req.user.id.toString()) {
      throw new Error("Only account owner can update the profile");
    }
    const updatedUser = await models.Driver.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      data: updatedUser,
      message: "Driver has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCarAficionados = async (req, res) => {
  try {
    const user = await models.CarAficionadosUser.findById(req.params.user_id);

    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, User not found ");
    }
    if (user._id !== req.user.id.toString()) {
      throw new Error("Only account owner can update the profile");
    }

    const updatedUser = await models.CarAficionadosUser.findByIdAndUpdate(
      req.params.user_id,
      req.body,
      {
        new: true,
      }
    ).select("-password");
    res.status(200).json({
      data: updatedUser,
      message: "CarAficionadosUser has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedUser = await models.Customer.findByIdAndDelete(
      req.params.user_id
    );
    if (!deletedUser) {
      res.status(404);
      throw new Error("Couldn't deleted, Customer not found");
    }
    res.status(200).json({
      message: "Customer has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const deletedUser = await models.Supplier.findByIdAndDelete(
      req.params.user_id
    );
    if (!deletedUser) {
      res.status(404);
      throw new Error("Couldn't deleted, Supplier not found");
    }
    res.status(200).json({
      message: "Supplier has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteServiceProvider = async (req, res) => {
  try {
    const deletedUser = await models.ServiceProvider.findByIdAndDelete(
      req.params.user_id
    );
    if (!deletedUser) {
      res.status(404);
      throw new Error("Couldn't deleted, Service Provider not found");
    }
    res.status(200).json({
      message: "Service Provider has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteCarAficionados = async (req, res) => {
  try {
    const deletedUser = await models.CarAficionadosUser.findByIdAndDelete(
      req.params.user_id
    );
    if (!deletedUser) {
      res.status(404);
      throw new Error("Couldn't deleted, Customer not found");
    }
    res.status(200).json({
      message: "Car Aficionados has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDriver = async (req, res) => {
  try {
    const deletedUser = await models.Driver.findByIdAndDelete(
      req.params.user_id
    );
    if (!deletedUser) {
      res.status(404);
      throw new Error("Couldn't deleted, Driver not found");
    }
    res.status(200).json({
      message: "Driver has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all customers

const getCustomers = async (req, res) => {
  try {
    const customers = await models.Customer.find({}).select("-password");
    res.status(200).json({
      data: customers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get all suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await models.Supplier.find({}).select("-password");
    res.status(200).json({
      data: suppliers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get all service providers
const getServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await models.ServiceProvider.find({}).select(
      "-password"
    );
    res.status(200).json({
      data: serviceProviders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get service provider
const getServiceProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceProvider = await models.ServiceProvider.findById(id).select(
      "-password"
    );
    if (!serviceProvider) {
      res.status(404);
      throw new Error("Service Provider not found");
    }
    res.status(200).json({
      data: serviceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const getDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await models.Driver.findById(id)
      .populate({ path: "ratings", model: "DriverRating" })
      .select("-password");
    if (!driver) {
      throw new Error("Driver not found");
    }
    res.status(200).json({
      data: driver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await models.Driver.find({}).select("-password");
    res.status(200).json({
      data: drivers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarAficionados = async (req, res) => {
  try {
    const CarAficionadosUser = await models.CarAficionadosUser.find({}).select(
      "-password"
    );
    res.status(200).json({
      data: CarAficionadosUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      throw new Error("No Token!, Token is required");
    }
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    if (decoded.user.role === "admin") {
      user = await models.Admin.findById(decoded.user.id).select(
        "-password -accountId"
      );
    } else if (decoded.user.role === "service provider") {
      user = await models.ServiceProvider.findById(decoded.user.id).select(
        "-password -accountId"
      );
    } else if (decoded.user.role === "supplier") {
      user = await models.Supplier.findById(decoded.user.id).select(
        "-password -accountId"
      );
    } else if (decoded.user.role === "customer") {
      user = await models.Customer.findById(decoded.user.id).select(
        "-password -accountId"
      );
    } else if (decoded.user.role === "driver") {
      user = await models.Driver.findById(decoded.user.id).select(
        "-password -accountId"
      );
    }

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to generate Token for a user
const generateToken = (id, role) => {
  return jwt.sign(
    {
      user: {
        id,
        role,
      },
    },
    process.env.SECRET_JWT,
    {
      expiresIn: "24h",
    }
  );
};

module.exports = {
  signUpUser,
  signInUser,
  updateDriver,
  updateCarAficionados,
  updateCustomer,
  updateSupplier,
  updateServiceProvider,
  deleteCustomer,
  deleteDriver,
  deleteServiceProvider,
  getCustomers,
  deleteSupplier,
  deleteCarAficionados,
  getCustomers,
  getSuppliers,
  getServiceProviders,
  getDrivers,
  getCarAficionados,
  getUser,

  // get user by IDs
  getDriver,
  getServiceProvider,
};
