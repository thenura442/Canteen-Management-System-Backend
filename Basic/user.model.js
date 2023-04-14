const mongoose = require("mongoose");

  const StudentSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      email: String,
      password: String,
      nic: String,
      dob: String,
      mobile_no: String,
      address: String,
      parent_name: String,
      parent_no: String,
      landline_no: String,
      grade: String,
      dle_access: String,
      url: String,
      type: String
    },
    { 
      timestamps: true 
    }
  );

  const StaffSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      email: String,
      password: String,
      nic: String,
      dob: String,
      mobile_no: String,
      address: String,
      landline_no: String,
      dle_access: String,
      url: String,
      type: String
    },
    { 
      timestamps: true 
    }
  );

const Student = mongoose.model("student", StudentSchema);
const Staff = mongoose.model("staff", StaffSchema);

module.exports.Student = Student;
module.exports.Staff = Staff;