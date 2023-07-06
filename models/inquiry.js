const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({

 
 

    name: { type: String, text: true },
    email: { type: String, text: true },
    number: { type: String, text: true },
    subject: { type: String, text: true },
     message: { type: String, text: true },



})

module.exports = mongoose.model('inquiry', inquirySchema)