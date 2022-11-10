const jwt = require('jsonwebtoken');
const userModel = require('../mongoose/models/user.model')
async function auth  (req, res, next){
try {

    const token = req.header("Authorization").replace("Bearer ","")
    const token_v = await jwt.verify(token,process.env.jwtkey)
    const user= await userModel.findById(token_v._id)
    if(user && user.userRole == "user"){
        req.user = user
        req.token = token
        next()
    }else{
        throw new Error("not user")
    }
    
} catch (error) {
    res.status(400).send(error.message)
}
}
module.exports = auth