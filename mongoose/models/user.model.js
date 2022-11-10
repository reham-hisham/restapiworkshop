const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const user = mongoose.Schema({

        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validation(val){
                if(!validator.isEmail(val)){
                    throw new Error("not valid email")
                }
            }
        },
        phoneNumber:{
            type:String,
            required:true,
            validation(val){
                if(!validator.isMobilePhone(val)){
                    throw new Error("not mobile number")
                }
            }
        },
        password:{
            type:String,
            required:true,
            validation(val){
                if(!validator.isStrongPassword(val)){
                    throw new Error("try strong password")
                }
            }
        },
        userRole:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
        tokens:[
            {
                token:{
                    type:String
                }
            }
        ]
    


})
user.pre("save",async function(){

    if(this.isModified("password")){

        this.password = await bcrypt.hash(this.password, 4)
      
    }
    
})
module.exports= mongoose.model("user",user)