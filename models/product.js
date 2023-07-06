const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

 
 

    product_name: { type: String, text: true },
    product_description: { type: String, text: true },
    product_stock : { type: String, text: true },
     product_image: { type: String, text: true },
    product_price: { type: String, text: true },
    status : {type:Boolean },
    category_id: { type:  mongoose.Schema.Types.ObjectId, ref: 'category' } 









   

          
     
    
  
    

})

module.exports = mongoose.model('product', productSchema)