require("../models/connections");
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { findById } = require( "../models/user.model" );
class usercontrol {
  static addUser = async (req, res) => {
    try {
    const user=  await new userModel(req.body).save();
      res.send(user)
    } catch (error) {
     res.status(400).send(error.message)
    }
  };
  static info =async(req, res)=>{
    try {
      res.send(req.user)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
  static login = async (req, res) => {
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("email not found");
      }
      let treuPassword = await bcrypt.compare(req.body.password , user.password)

      if(treuPassword){
       var token = await jwt.sign({"_id":user.id , "userRole":user.userRole},process.env.jwtkey)
       user.tokens = user.tokens.concat({token})
       user.save()
 
      }
      res.send(token)
    } catch (error) {
      res.status(400).send(error.message)
    }
  };
  static logout = async (token)=>{

    try {
        let id= await jwt.verify(token , "ourjwtkey")
       
        let user= await userModel.findById(id._id)
       
      let newTokens=await user.tokens.filter(e=>
        e.token !=  token
      )
     user.tokens = newTokens
        user.save()
    } catch (error) {
        
    }
  }
}

module.exports = usercontrol