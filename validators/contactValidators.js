const { celebrate, Joi } = require("celebrate")

module.exports.createContact = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        email :  Joi.string().required(),
        adders :  Joi.string().required(),       
        number :  Joi.string().required(),       

     
    






    })

})




module.exports.deleteContact = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deleteContact_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editContact = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchcContact = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.updateContact = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
           email :  Joi.string().required(),
        adders :  Joi.string().required(),       
        number :  Joi.string().required(),         
     
       




    })

}) 




