require('dotenv').config()

const express = require("express")


const db = require('./DB/connection')
const cors = require('cors')
const router = require("./Routes/router")

const saloonServer = express()

saloonServer.use(cors())
saloonServer.use(express.json())
saloonServer.use(router)
saloonServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT


saloonServer.listen(PORT,()=>{
    console.log(`Salon Server is running on the port, `,PORT);
})

saloonServer.get('/',(req,res)=>{
    res.send('Saloon Server')
})