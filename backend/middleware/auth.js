const jwt = require("jsonwebtoken");
const models = require("../models/Users");

const verifyToken = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_JWT);

      if (decoded.user.role === "admin") {
        req.user = await models.Admin.findById(decoded.user.id);
      } else if (decoded.user.role === "service provider") {
        req.user = await models.ServiceProvider.findById(decoded.user.id);
      } else if (decoded.user.role === "supplier") {
        req.user = await models.Supplier.findById(decoded.user.id);
      } else if (decoded.user.role === "customer") {
        req.user = await models.Customer.findById(decoded.user.id);
      } else if (decoded.user.role === "driver") {
        req.user = await models.Driver.findById(decoded.user.id);
      }else{
        throw new Error("No, user nor that role")
      }
      console.log("decoded user", decoded.user);
      next();
    }
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized, No token.");
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const verifyAdministrator = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      req.user = await models.Admin.findById(decoded.user.id);
      next();
    }
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized, No token.");
    }
  } catch (err) {
    res.status(403).json({ message: "User isn't an admin user" });
  }
};

module.exports = {
  verifyToken,
  verifyAdministrator,
};
