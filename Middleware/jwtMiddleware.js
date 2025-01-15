const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside the jwt miidleware');
    try{            //to get token from req.header
            const token = req.headers['authorization'].slice(7)
            console.log(token);
             
            //token verify
            jwtTokenVerification = jwt.verify(token,process.env.jwtKey) 
            console.log(jwtTokenVerification);
            req.payload = jwtTokenVerification.userId
            next()
    }
    catch(err){
        res.status(400).json('Please Login')
    }
   
}
module.exports=jwtMiddleware