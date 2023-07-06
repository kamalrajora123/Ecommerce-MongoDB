
const usersControllers = require("../../controllers/clientController/usersControllers");
const orderController = require("../../controllers/clientController/orderController");

const usersValidators=require("../../validators/usersValidators");
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/signup",usersValidators.createUser, usersControllers.signup)
router.post("/login",usersValidators.createUser, usersControllers.loginUser)



router.post("/createorder",usersValidators.order, orderController.createOrder)
router.post("/orderhistory", usersControllers.orderHistory)




module.exports = router;