const mongoose= require('mongoose')

const product = mongoose.Schema({
    name:{
        type:String,
             required:true
    },
    price:{
        type:Number,
             required:true
    },
    specifications:[
       { type:String}
    ],
    category:{
        type:String,
        unique:true,
    },
    subCategory:{
        type:String,
    },
    size:[{
        type:String
    }]


})

module.exports = mongoose.model("product", product)