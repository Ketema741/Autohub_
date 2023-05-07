const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models/Users");

const getUserByEmail = async (email) => {
  const [
    admin,
    customer,
    supplier,
    driver,
    serviceProvider,
  ] = await Promise.all([
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
    const { name, email, phone, password, userType } = req.body;
    if (!name || !email || !password || !userType) {
      res.status(400);
      throw new Error(" Please enter all the required fields");
    }

    const userExist = await getUserByEmail();
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
          name,
          phone,
          password: hashedPassword,
          role: "admin",
        });

        if (admin) {
          res
            .status(201)
            .json({
              admin,
              token: generateToken(admin._id, admin.role),
            })
            .select("-password");
        } else {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
        break;
      case "service provider":
        const service_provider = await models.ServiceProvider.create({
          email,
          name,
          phone,
          password: hashedPassword,
          role: "service provider",
        });
        if (service_provider) {
          res.status(201).json({
            _id: service_provider._id,
            email: service_provider.email,
            name: service_provider.name,
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
          name,
          phone,
          password: hashedPassword,
          role: "supplier",
        });
        if (supplier) {
          res.status(201).json({
            _id: supplier._id,
            email: supplier.email,
            name: supplier.name,
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
          name,
          phone,
          password: hashedPassword,
          role: "customer",
        });
        if (customer) {
          res.status(201).json({
            _id: customer._id,
            email: customer.email,
            name: customer.name,
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
          name,
          phone,
          password: hashedPassword,
          role: "driver",
        });
        if (driver) {
          res.status(201).json({
            _id: driver._id,
            email: driver.email,
            name: driver.name,
            token: generateToken(driver._id, driver.role),
          });
        } else {
          res.status(400);
          throw new Error("User couldn't be Registered, Invalid credentials");
        }
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
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
    console.log(user);
    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, Customer not found ");
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
    console.log(user);
    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, Service Provider not found ");
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

const updateUser = async (req, res) => {
  try {
    const user = await models.Supplier.findById(req.params.user_id);
    console.log(user);
    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, Supplier not found ");
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
    console.log(user);
    if (!user) {
      res.status(404);
      throw new Error("Couldn't be updated, User not found ");
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
const deleteUser = async (req, res) => {
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
const getUsers = async (req, res) => {
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

// get all drivers
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
      expiresIn: "30d",
    }
  );
};

module.exports = {
  signUpUser,
  signInUser,
  updateDriver,
  updateCustomer,
  updateUser,
  updateServiceProvider,
  deleteCustomer,
  deleteDriver,
  deleteServiceProvider,
  deleteUser,
  getCustomers,
  getServiceProviders,
  getUsers,
  getDrivers,
};