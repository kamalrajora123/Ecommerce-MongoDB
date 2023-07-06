const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({

 
 

    name: { type: String, text: true },
    client_image: { type: String, text: true },
    story:{type:String,text:true},

    status : {type:Boolean }
   

 
})

module.exports = mongoose.model('story', storySchema)