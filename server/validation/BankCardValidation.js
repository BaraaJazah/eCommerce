const joi = require("joi")

class BankCardValidation {


    static getValidation(obj){

        const schema = joi.object({

            customer_id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            cardName : joi.string().trim().min(2).max(100).pattern(/^[a-zA-Z\u0600-\u06FF\s\-]+$/).required() ,
            cardNumber : joi.string().trim().min(16).max(16).pattern(/^[0-9\s\-]+$/).required() ,
            month : joi.number().min(1).max(12).required() ,
            year : joi.number().min(2024).required() ,
            cvv : joi.number().min(100).max(999).required() ,

        })
    
        return schema.validate(obj);
    }


    static getByIdValidation(obj){

        const schema = joi.object({
            id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
            customer_id : joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required() ,
     
            cardName : joi.string().trim().min(2).max(100).pattern(/^[a-zA-Z\u0600-\u06FF\s\-]+$/).required() ,
            cardNumber : joi.string().trim().min(16).max(19).pattern(/^[0-9\s\-]+$/).required() ,
            month : joi.number().min(1).max(12).required() ,
            year : joi.number().min(2024).required() ,
            cvv : joi.number().min(100).max(999).required() ,
    
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

module.exports = BankCardValidation; 