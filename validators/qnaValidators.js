const { celebrate, Joi } = require("celebrate")

module.exports.createQna = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        question :  Joi.string().required(),       
     
        answer :  Joi.string().required(),
        question_image:Joi.any()






    })

})




module.exports.deleteQna = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.deleteQna_query = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})




module.exports.editQna = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.searchQna = celebrate({

    query: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})

module.exports.searchQna = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        _id: Joi.string().required()


    })

})


module.exports.updateQna = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        
        question :  Joi.string().required(),       
     
        answer :  Joi.string().required(),
        question_image:Joi.any()




    })

}) 



module.exports.updateQnaStatus = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        
        _id: Joi.string().required(),
        status: Joi.boolean().required(),
        
      



    })

}) 