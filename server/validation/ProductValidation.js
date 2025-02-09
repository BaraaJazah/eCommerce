const joi = require("joi")

class ProductValidation {

    // Validation Data

    static getValidation(obj) {

        const schema = joi.object({

            subCatagory_id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),
            name: joi.string().trim().min(2).max(150).required(),
            desc: joi.string().trim().min(2).max(300).required(),
            sex: joi.string().valid("man", "woman", "baby", "unisex").required(),

            images: joi.array().items(
                // joi.string().uri().pattern(/\.(jpg|jpeg|png|gif)$/i).required() // يتحقق من أن الرابط هو رابط صورة بصيغة معروفة
                joi.string().uri().required() // يتحقق من أن الرابط هو رابط صورة بصيغة معروفة

            ).required(),

            prices: joi.object({

                typeKey: joi.string().trim().min(2).max(50).required(),
                typeValue: joi.array()
                    .items(
                        joi.object({
                            size: joi.string().trim().min(2).max(50).required(),
                            price: joi.number().min(0).required(),
                            oldPrice: joi.number().min(0).required(),
                            quantity: joi.number().min(0).required(),
                        })
                    )
                    .required()
            }).required(),




            details: joi.array().items(
                joi.object({
                    key: joi.string().trim().min(2).max(100).required(),
                    value: joi.string().trim().min(2).max(150).required()
                })
            ).required(),


        })

        return schema.validate(obj);
    }

    // Validation ID And Data

    static getByIdValidation(obj) {

        const schema = joi.object({
            id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),

            subCatagory_id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),
            name: joi.string().trim().min(2).max(150).required(),
            desc: joi.string().trim().min(2).max(300).required(),
            sex: joi.string().valid("man", "woman", "baby", "unisex").required(),

            images: joi.array().items(
                joi.string().uri().pattern(/\.(jpg|jpeg|png|gif)$/i).required() // يتحقق من أن الرابط هو رابط صورة بصيغة معروفة
            ).required(),

            prices: joi.object({

                typeKey: joi.string().trim().min(2).max(50).required(),
                typeValue: joi.array()
                    .items(
                        joi.object({
                            size: joi.string().trim().min(2).max(50).required(),
                            price: joi.number().min(0).required(),
                            oldPrice: joi.number().min(0).required(),
                            quantity: joi.number().min(0).required(),
                        })
                    )
                    .required()
            }).required(),

            details: joi.array().items(
                joi.object({
                    key: joi.string().trim().min(2).max(100).required(),
                    value: joi.string().trim().min(2).max(150).required()
                })
            ).required(),


        })
        return schema.validate(obj);
    }

    // Validation ID 

    static idValidation(obj) {

        const schema = joi.object({
            id: joi.string().length(24).pattern(/^[0-9a-fA-F]{24}$/).required(),      // لانو ال (اي دي ) مكون من 24 حرف وبال هيكساديسيمال
            //المشكلة اي خطا بال اي دي بصير الخطا بال (try)
        })

        return schema.validate(obj);
    }


    // Validation Sex ( "man", "woman", "baby", "unisex" ) 

    static sexValidation(obj) {

        const schema = joi.object({
            sex: joi.string().valid("man", "woman", "baby", "unisex").required(),
        })

        return schema.validate(obj);
    }

    // Validation name for Search  

    static nameValidation(obj) {

        const schema = joi.object({
            name: joi.string().trim().max(150).required(),
        })

        return schema.validate(obj);
    }

}

module.exports = ProductValidation; 