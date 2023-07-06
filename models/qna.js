const mongoose = require('mongoose')

const qnaSchema = new mongoose.Schema({

 
 

    question: { type: String, text: true },
    answer: { type: String, text: true },
    question_image: { type: String, text: true },
    status : {type:Boolean }





   

          
     
    
  
    

})

module.exports = mongoose.model('qna', qnaSchema)