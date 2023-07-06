const { celebrate, Joi } = require("celebrate")

module.exports.createOffer = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
     name :  Joi.string().required(), 
        offer :  Joi.string().required(),       

     
    






    })

})




module.exports.deleteOffer = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deleteOffer_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editOffer = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchOffer = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.searchOffer = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.updateOffer = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
        name :  Joi.string().required(),   
        offer :  Joi.string().required(),       

     
       
    



    })

}) 




module.exports.updateOfferStatus = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        status: Joi.boolean().required(),
        
      



    })

}) 