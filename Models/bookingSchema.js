const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    services:{
        type:String,
        required:true
    }, 
    userId:{
        type:String
    }
})

const booking = mongoose.model('booking',bookingSchema)
module.exports=booking