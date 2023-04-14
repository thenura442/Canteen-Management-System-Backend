//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Student Validation
const registerStudentValidation = data => {
    const schema = Joi.object({
        _id: Joi.string()
            .min(6)
            .required(),
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        nic: Joi.string()
            .required(),
        dob: Joi.string()
            .required(),
        mobile_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        address: Joi.string()
            .min(10)
            .max(255)
            .required(),
        parent_name: Joi.string()
            .min(3)
            .required(),
        parent_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        landline_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        grade: Joi.string()
            .required(),
        dle_access: Joi.string()
            .max(10)
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024),
        type: Joi.string()
            .min(5)
            .max(9)
            .required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    });
    return schema.validate(data);
}




//Staff Validation
const registerStaffValidation = data => {
    const schema = Joi.object({
        _id: Joi.string()
            .min(6)
            .required(),
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        nic: Joi.string()
            .required(),
        dob: Joi.string()
            .required(),
        mobile_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        address: Joi.string()
            .min(10)
            .max(255)
            .required(),
        landline_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        dle_access: Joi.string()
            .max(10)
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024),
        type: Joi.string()
            .min(4)
            .max(9)
            .required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    });
    return schema.validate(data);
}



//Validating Login

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()  
            .required(),
        type: Joi.string()
            .required()
    });
    return schema.validate(data);
}



module.exports.registerStudentValidation = registerStudentValidation;
module.exports.registerStaffValidation = registerStaffValidation;
module.exports.loginValidation = loginValidation;