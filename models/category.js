const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

 
 

    name: { type: String, text: true },
    category_image: { type: String, text: true },

    status : {type:Boolean }
   

})

module.exports = mongoose.model('category', categorySchema)