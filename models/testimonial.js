const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({

 
 

    name: { type: String, text: true },
    review: { type: String, text: true },
    testimonial_image: { type: String, text: true },
      date: { type: String, text: true },
     time: { type: String, text: true },
   
    status : {type:Boolean }





   

          
     
    
  
    

})

module.exports = mongoose.model('testimonial', testimonialSchema)