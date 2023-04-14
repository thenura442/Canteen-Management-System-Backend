const mongoose = require("mongoose");

  const EmployeeSchema = new mongoose.Schema(
    {
      first_name: String,
      last_name: String,
      nic: String,
      dob: String,
      email: String,
      mobile_no: String,
      address: String,
      access: String,
      type: String,
      vendor: String,
      url: String,
      password: String
    },
    { 
      timestamps: true 
    }
  );

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports.Employee = Employee;