const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    productImg:{
        type:String,
        required:true
    }
})

const product = mongoose.model("product",productSchema)
module.exports = product