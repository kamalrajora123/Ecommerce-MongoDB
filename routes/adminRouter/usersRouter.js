
const usersControllers = require("../../controllers/adminController/usersControllers");
const usersValidators=require("../../validators/usersValidators");

const express = require("express");

const router = express.Router();

router.post("/signup",usersValidators.createUser, usersControllers.signup)
router.post("/login",usersValidators.createUser, usersControllers.loginUser)



module.exports = router;