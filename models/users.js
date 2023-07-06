const mongoose = require('mongoose')
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const config =require("../config/config.json")
const  usersSchema= new mongoose.Schema({

 
 

    email: { type: String, text: true },
    password: { type: String, text: true },


    status : {type:Boolean },
    salt: { type: String },
    hash: { type: String }

   
})






usersSchema.methods.setPassword = function(password) {

    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(password, this.salt, 50, 32, 'sha512').toString("hex")
}

usersSchema.methods.validatePassword = function(password) {

    var hash = crypto.pbkdf2Sync(password, this.salt, 50, 32, 'sha512').toString('hex')
    return hash === this.hash
}

usersSchema.methods.generateJWT = function () {
    return jwt.sign({ _id: this._id }, config.secretkey);
  };

module.exports = mongoose.model('users',usersSchema)