require("dotenv").config();
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../controllers/usersController");
const { sendResetPasswordEmail } = require("./mail");
const Users = require("../models/Users");

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
        expiresIn: "3m",
      }
    );

    user.resetToken.token = token;
    user.resetToken.resetTokenExpiration = Date.now() + 180000;
    await user.save();

    // Send password reset email
    const resetLink = `http://localhost:${process.env.PORT}/users/account/reset-password?token=${token}`;
    await sendResetPasswordEmail(email, resetLink);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, token } = req.body;
    if (!email || !newPassword) {
      res.status(400);
      throw new Error("Provide your email and new password");
    }
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404);
      throw new Error("No user with email. Please enter your correct email ");
    }

    console.log(
      new Date(user.resetToken.resetTokenExpiration).getTime() <
        new Date().getTime()
    );
    console.log(
      new Date(user.resetToken.resetTokenExpiration).getTime(),
      new Date().getTime()
    );
    if (user.resetToken.resetTokenExpiration === undefined) {
      throw new Error(
        "No reset token, Please click forgot password on login page"
      );
    }
    if (
      new Date(user.resetToken.resetTokenExpiration).getTime() <
      new Date().getTime()
    ) {
      res.status(400);
      throw new Error(
        "The reset token has expired, Please request password reset by clicking forgot password link"
      );
    }
    // Update user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetToken = {};
    await user.save();
    res.status(200).json({ message: "Password updated successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

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
