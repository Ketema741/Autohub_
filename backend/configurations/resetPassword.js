require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../controllers/usersController");
const { sendResetPasswordEmail } = require("./mail");

const getUserByEmailWithResetToken = async (email) => {
  const [admin, customer, supplier, driver, caraficionados, serviceProvider] =
    await Promise.all([
      models.Customer.findOne({
        email,
        "resetToken.resetTokenExpiration": { $gt: new Date() },
      }),
      models.Admin.findOne({
        email,
        "resetToken.resetTokenExpiration": { $gt: new Date() },
      }),
      models.ServiceProvider.findOne({
        email,
        "resetToken.resetTokenExpiration": { $gt: new Date() },
      }),
      models.Driver.findOne({
        email,
        "resetToken.resetTokenExpiration": { $gt: new Date() },
      }),
      models.Supplier.findOne({
        email,
        "resetToken.resetTokenExpiration": { $gt: new Date() },
      }),
      models.CarAficionados.findOne({
        email,
        "resetToken.resetTokenExpiration": { $gt: new Date() },
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
    const resetLink = `http://localhost:6767/account/reset-password/${token}`;
    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await getUserByEmailWithResetToken(email);

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Update user's password
    user.password = hashedPassword;
    user.resetToken = {};
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
