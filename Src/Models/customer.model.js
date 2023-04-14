const mongoose = require("mongoose");

  const CustomerSchema = new mongoose.Schema(
    {
      first_name: String,
      last_name: String,
      nic: String,
      dob: String,
      email: String,
      mobile_no: String,
      address: String,
      access: String,
      url: String,
      password: String
    },
    { 
      timestamps: true 
    }
  );

const Customer = mongoose.model("customer", CustomerSchema);

module.exports.Customer = Customer;