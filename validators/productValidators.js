const { celebrate, Joi } = require("celebrate")

module.exports.createPro = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        product_name :  Joi.string().required(),  
        product_description :  Joi.string().required(),       

        product_stock :  Joi.string().required(),       

     
        product_price:  Joi.number().required(),

        product_image:Joi.any()






    })

})




module.exports.deletePro = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deletePro_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editPro = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchPro = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.searchPro = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})



module.exports.updateProductStatus = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        // status: Joi.boolean().required(),
        
      



    })

}) 

module.exports.updatePro = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
        product_name :  Joi.string().required(),  
        product_description :  Joi.string().required(),       

        product_stock :  Joi.string().required(),       

     
        product_price:  Joi.number().required(),
     category_id:Joi.any(),
        product_image:Joi.any()




    })

}) 



// ......imageupdate...////



module.exports.updateImage = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        product_image:Joi.any()

    })
})

