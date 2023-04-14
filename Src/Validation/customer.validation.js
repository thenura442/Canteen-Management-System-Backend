//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Customer Validation
const registerCustomerValidation = data => {
    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        last_name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        nic: Joi.string()
            .min(8)
            .max(15)
            .required(),
        dob: Joi.string()
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required(),
        mobile_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        address: Joi.string()
            .min(8)
            .max(255)
            .required(),
        access: Joi.string()
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required()
    });
    return schema.validate(data);
}



module.exports.registerCustomerValidation = registerCustomerValidation;