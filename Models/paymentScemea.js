const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    paymentId:String,
    orderId:String,
    status:String,
    amount:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const payment = mongoose.model('payment',paymentSchema)

module.exports = payment