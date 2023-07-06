const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({

 
 

    email: { type: String, text: true },
    adders: { type: String, text: true },
    number : { type: Number, text: true },
    

})

module.exports = mongoose.model('contact', contactSchema)