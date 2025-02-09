const joi = require("joi")

class SubCatagoryValidation {


    static getValidation(obj) {

        const schema = joi.object({
            catagory_id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),
            name: joi.string().trim().min(2).max(100).required(),

        })

        return schema.validate(obj);
    }


    static getByIdValidation(obj) {

        const schema = joi.object({
            id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),
            catagory_id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),
            name: joi.string().trim().min(2).max(100).required(),

        })
        return schema.validate(obj);
    }

    static idValidation(obj) {

        const schema = joi.object({
            id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),      // لانو ال (اي دي ) مكون من 24 حرف وبال هيكساديسيمال
            //المشكلة اي خطا بال اي دي بصير الخطا بال (try)
        })

        return schema.validate(obj);
    }

}

module.exports = SubCatagoryValidation; 