const { celebrate, Joi } = require("celebrate")

module.exports.createTest = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        name :  Joi.string().required(),       
     
        review :  Joi.string().required(),
         date :  Joi.string().required(),

         time :  Joi.string().required(),

       

        testimonial_image:Joi.any()






    })

})




module.exports.deleteTest = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deleteTest_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editTest = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchTest = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.searchTest = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.updateTest = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
        name :  Joi.string().required(),       
     
        review :  Joi.string().required(),
         date :  Joi.string().required(),

         time :  Joi.string().required(),

       

        testimonial_image:Joi.any()





    })

}) 



module.exports.updateTestStatus = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        status: Joi.boolean().required(),
        
      



    })

}) 