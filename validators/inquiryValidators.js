const { celebrate, Joi } = require("celebrate")

module.exports.createinquiry = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        name :  Joi.string().required(),       
     
        email :  Joi.string().required(),
         number :  Joi.string().required(),

         subject :  Joi.string().required(),
         message :  Joi.string().required(),


    })

})




module.exports.deleteinquiry = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deleteinquiry_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editinquiry = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchinquiry = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.searchinquiry = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.updateinquiry = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
        name :  Joi.string().required(),       
     
        email :  Joi.string().required(),
         number :  Joi.string().required(),

         subject :  Joi.string().required(),
         message :  Joi.string().required(),





    })

}) 



module.exports.updateinquiryStatus = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        status: Joi.boolean().required(),
        
      



    })

}) 