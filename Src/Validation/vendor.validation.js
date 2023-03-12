//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Vendor Validation
const registerVendorValidation = data => {
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
        description: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        mobile_no: Joi.string()
            .max(10)
            .min(10)
            .required(),
        owner: Joi.string()
            .required(),
        access: Joi.string()
            .max(10)
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    });
    return schema.validate(data);
}



module.exports.registerVendorValidation = registerVendorValidation;