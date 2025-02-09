const joi = require("joi")
const joiPassword = require("joi-password-complexity")



class AuthValidation {


    static registerValidation(obj) {

        const schema = joi.object({
            name: joi.string().trim().min(2).max(100).required(),
            surname: joi.string().trim().min(2).max(100).required(),
            email: joi.string().trim().min(2).max(100).email().required(),
            password: joiPassword().trim().min(2).max(100).required(),
            photo: joi.string().max(200),
            phone: joi.number().required(),

        })

        return schema.validate(obj);
    }


    static loginValidation(obj) {

        const schema = joi.object({
            email: joi.string().trim().min(2).max(100).email().required(),
            password: joi.string().trim().min(2).max(100).required(),

        })

        return schema.validate(obj);
    }
}

module.exports = AuthValidation