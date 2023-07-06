const mongoose = require('mongoose')

const sliderSchema = new mongoose.Schema({

 
 

    name: { type: String, text: true },
     slider_image: { type: String, text: true },
    offer:{ type: String, text: true },
    price:{ type: String, text: true },


    status : {type:Boolean }

    

})

module.exports = mongoose.model(' slider',  sliderSchema)