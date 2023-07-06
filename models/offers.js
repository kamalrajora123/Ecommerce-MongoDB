const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({

 
 

    name: { type: String, text: true },
     category_image: { type: String, text: true },
    offer:{ type: String, text: true },


    status : {type:Boolean }

    

})

module.exports = mongoose.model(' offer',  offerSchema)