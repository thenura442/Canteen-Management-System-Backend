//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Item Validation
const registerItemValidation = data => {
    const schema = Joi.object({
        _id: Joi.string()
            .min(6)
            .required(),
        name: Joi.string()
            .min(3)
            .required(),
        description: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        type: Joi.string()
            .required(),
        portion: Joi.string()
            .required(),
        price: Joi.string()
            .required(),
        url: Joi.string()
            .min(10)
            .max(1024),
        createdAt: Joi.string(),
        updatedAt: Joi.string()
    });
    return schema.validate(data);
}



module.exports.registerItemValidation = registerItemValidation;