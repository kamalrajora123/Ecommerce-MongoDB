const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

 
 

    user_id: { type:  mongoose.Schema.Types.ObjectId, ref: 'users' } ,
  
    product_id: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'product' } ],
    
    price: { type: Number, text: true },


})

module.exports = mongoose.model('order', orderSchema)