const { Supplier, TemporarySupplier } = require("../../models/Users");

// Admin dashboard
const getPendingSuppliers = async (req, res) => {
  try {
    const pendingSuppliers = await TemporarySupplier.find({});
    res.status(200).json(pendingSuppliers);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Approve supplier registration
const approveSupplier = async (req, res) => {
  try {
    const { accountId } = req.body;
    const { supplierId } = req.params;
    const temporarySupplier = await TemporarySupplier.findById(supplierId);
    if (!temporarySupplier) {
      return res
        .status(404)
        .json({ message: "Supplier not found on temporary Suppliers" });
    }

    if (!accountId) {
      throw new Error(
        "Supplier must have an Account ID. Please provide approve the supplier registration!"
      );
    }

    const supplier = await Supplier.create({
      firstName: temporarySupplier.firstName,
      lastName: temporarySupplier.lastName,
      email: temporarySupplier.email,
      password: temporarySupplier.password,
      phone: temporarySupplier.phone,
      role: temporarySupplier.role,
      accountId,
    });

    if (supplier) {
      await TemporarySupplier.findByIdAndDelete(temporarySupplier._id);
      res.status(200).json({ message: "Supplier registration approved!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Reject supplier registration
const rejectSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const rejectedSupplier = await TemporarySupplier.findByIdAndDelete(
      supplierId
    );
    if (rejectedSupplier) {
      res.status(200).json({ message: "Supplier registration rejected!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getPendingSuppliers,
  approveSupplier,
  rejectSupplier,
};
