const responseManagement = require("../../lib/responseManagement");
const users = require("../../models/users");
const orders   = require("../../models/order")
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");




module.exports.signup = async(req, res) => {
    try {

        let user = await users.findOne({ email: req.body.email })

        if (user) {

            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, helpers.user_already_exists)

        } else {

            var password = req.body.password

            delete req.body.password



            const user = await users(req.body).save()
            user.setPassword(password)
            await users.updateOne({ _id: user._id }, user)


        }

        responseManagement.sendResponse(res, httpStatus.OK, helpers.user_created);

    } catch (error) {

    }


}



module.exports.orderHistory = async(req,res)=>{

  try {

    let user = await users.findOne({ _id: req.body._id })

    if (user) {

      let  order  = await orders.findOne({user_id:req.body._id }).populate("product_id")
   console.log(order)

    } else {



    }

} catch (error) {
  console.log(error)

}


}


module.exports.loginUser = async (req, res) => {

    try {
  
  
      const user = await users.findOne({ email :req.body.email  })
  
      if (user && user.hash && user.salt) {
  
        if (user.validatePassword(req.body.password)) {
       
          const token = await user.generateJWT();
          const user_data = {
            _id: user._id,
           
            email:user.email

            
          };
  
          responseManagement.sendResponse(res,httpStatus.OK,helpers.login_success,{token:token,user_data});
  
        }else{
  
          responseManagement.sendResponse(res,httpStatus.UNAUTHORIZED,helpers.user_login_fail);
  
        }
  
      }else{
  
        responseManagement.sendResponse(res,httpStatus.UNAUTHORIZED,helpers.user_login_fail);
  
      }
  
  
    } catch(err) {
      console.log(err);
  
    }
  
  }
  