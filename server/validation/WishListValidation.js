const joi = require("joi")

class WishListValidation {


    static getValidation(obj){

        const schema = joi.object({

            customer_id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            product_id :  joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,

        })
    
        return schema.validate(obj);
    }

    static getByIdValidation(obj){

        const schema = joi.object({
            id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,

            customer_id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            product_id :  joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
    
        })
        return schema.validate(obj);
    }

    static addToCartValidation(obj){

        const schema = joi.object({
            id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,

            customer_id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            product_id :  joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            productPrice_id :  joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
    
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

module.exports = WishListValidation; 