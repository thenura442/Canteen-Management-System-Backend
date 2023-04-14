//VALIDATING REGISTRATION
const Joi = require('@hapi/joi');

//Validating Web Login

const loginWebValidation = data => {
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



//Validating Mobile Login

const loginMobileValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()  
            .required()
    });
    return schema.validate(data);
}

module.exports.loginWebValidation = loginWebValidation;
module.exports.loginMobileValidation = loginMobileValidation;