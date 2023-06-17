require("dotenv").config();
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../controllers/usersController");
const { sendResetPasswordEmail } = require("./mail");
const Users = require("../models/Users");

const getUserByEmailWithResetToken = async (email) => {
  const [admin, customer, supplier, driver, caraficionados, serviceProvider] =
    await Promise.all([
      Users.Customer.findOne({
        email
      }),
      Users.Admin.findOne({
        email
      }),
      Users.ServiceProvider.findOne({
        email
      }),
      Users.Driver.findOne({
        email
      }),
      Users.Supplier.findOne({
        email,
      }),
      Users.CarAficionados.findOne({
        email
      }),
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
  if (caraficionados) {
    return caraficionados;
  }
  if (serviceProvider) {
    return serviceProvider;
  }

  return null;
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_JWT,
      {
        expiresIn: "1h",
      }
    );

    user.resetToken.token = token;
    user.resetToken.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    // Send password reset email
    const resetLink = `http://localhost:6767/users/account/reset-password/${token}`;
    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || newPassword) {
      res.status(400);
      throw new Error("Provide your email and new password");
    }
    const user = await getUserByEmailWithResetToken(email);
    console.log(user);
    if (!user) {
      res.status(404);
      throw new Error("No user with email. Please enter your correct email ");
    }

     if (
      new Date(user.resetToken.resetTokenExpiration).getTime() <
      new Date().getTime()
    ) {
      res.status(400);
      throw new Error("The reset token has expired");
    }

    // Send the password reset template to the client
    const filePath = path.join(__dirname, "/static/reset-password.html");
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
    // Update user's password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);
//     user.password = hashedPassword;
//     user.resetToken = {};
//     await user.save();
//     console.log(user);
//     res.status(200).json({ message: "Password updated successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

const getTemplate = async (req, res) => {
  try {
    
    const filePath = path.join(__dirname, "/static/reset-password.html");
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
  getTemplate,
};
