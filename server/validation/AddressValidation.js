const joi = require("joi")

class AddressValidation {


    static getValidation(obj){

        const schema = joi.object({

            customer_id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            city : joi.string().trim().min(2).max(100).pattern(/^[a-zA-Z\u0600-\u06FF\s\-]+$/).required() ,
            region : joi.string().trim().min(2).max(100).required() ,
            district : joi.string().trim().min(2).max(100).required() ,
            address : joi.string().trim().min(2).max(300).required() ,
            addressHead : joi.string().trim().min(2).max(100).required() ,

        })
    
        return schema.validate(obj);
    }


    static getByIdValidation(obj){

        const schema = joi.object({
            id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            customer_id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,

            city : joi.string().trim().min(2).max(100).pattern(/^[a-zA-Z\u0600-\u06FF\s\-]+$/).required() ,
            region : joi.string().trim().min(2).max(100).required() ,
            district : joi.string().trim().min(2).max(100).required() ,
            address : joi.string().trim().min(2).max(300).required() ,
            addressHead : joi.string().trim().min(2).max(100).required() ,
    
        })
        return schema.validate(obj);
    }

    static idValidation(obj){

        const schema = joi.object({
            id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,      // لانو ال (اي دي ) مكون من 24 حرف وبال هيكساديسيمال
                                                                                        //المشكلة اي خطا بال اي دي بصير الخطا بال (try)
        })
    
        return schema.validate(obj);
    }

}

module.exports = AddressValidation; 