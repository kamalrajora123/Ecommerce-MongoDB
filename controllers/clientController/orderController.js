const responseManagement = require("../../lib/responseManagement");
const order = require("../../models/order");

const helpers = require("../../helpers/messages.json");


module.exports.createOrder = async(req,res)=>{
    try {
    
      
    

            const orderPlace = await order.create(req.body)
            await orderPlace.save()
        
        responseManagement.sendResponse(res, 200, helpers.category_added_success)

    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
    }



}