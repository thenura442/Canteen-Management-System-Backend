const mongoose = require("mongoose");

  const VendorSchema = new mongoose.Schema(
    {
      vendor_name: String,
      owner: String,
      email: String,
      description: String,
      url: String,
      mobile_no: String,
      access: String
    },
    { 
      timestamps: true 
    }
  );

const Vendor = mongoose.model("vendor", VendorSchema);

module.exports.Vendor = Vendor;