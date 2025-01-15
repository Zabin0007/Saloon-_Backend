const mongoose = require('mongoose')

const connection = process.env.connectionString;

mongoose.connect(connection).then(response=>{
    console.log('Saloon server is connected to DB');
    
})
.catch(err=>{
    console.log("Error",err);
})