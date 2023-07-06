const { celebrate, Joi } = require("celebrate")

module.exports.createUser = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        

        email: Joi.string().required(),

        password: Joi.string().required(),


    })

})



module.exports.order = celebrate({

    body: Joi.object().options({ abortEarly: false }).keys({
        

        user_id: Joi.string().required(),

        product_id: Joi.any().required(),
        price: Joi.any().required(),



    })

})