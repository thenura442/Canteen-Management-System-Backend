const mongoose = require("mongoose");

  const VendorSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      email: String,
      description: String,
      mobile_no: String,
      owner: String,
      access: String,
      url: String
    },
    { 
      timestamps: true 
    }
  );

const Vendor = mongoose.model("vendor", VendorSchema);

module.exports.Vendor = Vendor;