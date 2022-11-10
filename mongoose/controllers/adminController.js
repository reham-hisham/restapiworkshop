const productModel = require('../models/productModel')

class product{

   static  addProduct = async(req,res)=>{

    try {
         console.log(req.body)
        const newproduct = await new productModel(req.body).save()
        res.send(newproduct)
    } catch (error) {
        res.status(400).send(error.meassage)
    }

    }
}

module.exports = product