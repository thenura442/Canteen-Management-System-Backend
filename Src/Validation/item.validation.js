//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Item Validation
const registerItemValidation = data => {
    const schema = Joi.object({
        id: Joi.string(),
        item_name: Joi.string()
            .min(3)
            .required(),
        vendor: Joi.string()
            .required(),
        description: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024),
        type: Joi.string()
            .required(),
        portion: Joi.string()
            .required(),
        price: Joi.string()
            .required(),
        availability: Joi.string()
            .required(),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    });
    return schema.validate(data);
}



module.exports.registerItemValidation = registerItemValidation;