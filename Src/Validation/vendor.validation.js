//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Vendor Validation
const registerVendorValidation = data => {
    const schema = Joi.object({
        vendor_name: Joi.string()
            .min(3)
            .max(255)
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required(),
        description: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024),
        mobile_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        access: Joi.string()
            .max(10)
            .required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    });
    return schema.validate(data);
}



module.exports.registerVendorValidation = registerVendorValidation;