const { celebrate, Joi } = require("celebrate")

module.exports.createSlider = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
     name :  Joi.string().required(), 
        offer :  Joi.string().required(),       
        price :  Joi.string().required(),       

     
    






    })

})




module.exports.deleteSlider = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deleteSlider_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editSlider = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchSlider = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.searchSlider = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.updateSlider = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
        name :  Joi.string().required(),   
        offer :  Joi.string().required(),       
        price :  Joi.string().required(),       

     
       
    



    })

}) 




module.exports.updateOfferStatus = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        status: Joi.boolean().required(),
        
      



    })

}) 
