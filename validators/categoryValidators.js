const { celebrate, Joi } = require("celebrate")

module.exports.createCate = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        name :  Joi.string().required(),       
     
    






    })

})




module.exports.deleteCate = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deleteCate_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editCate = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchCate = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.searchCate = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.updateCate = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
        name :  Joi.string().required(),       
     
       




    })

}) 




module.exports.updateCatStatus = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        status: Joi.boolean().required(),
        
      



    })

}) 