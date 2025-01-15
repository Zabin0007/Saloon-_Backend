const { json } = require("express")
const users = require("../Models/userSchema")
const admin = require("../Models/adminScema")
const jwt = require("jsonwebtoken")

exports.registerAPI = async (req, res) => {
    console.log("Inside the register api");
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(400).json(
                { message: "User Already Existing" }
            )
        }
        else {
            const newUser = new users({
                username: username,
                email: email,
                password: password,
            })
            await newUser.save()
            res.status(200).json("Resgistered Successfully")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.loginAPI = async (req, res) => {
    console.log('inside the login Api');
    const { email, password } = req.body
    try { // Attempt to find a registered user 
        const registeredUser = await users.findOne({ email, password });
        if (registeredUser) {
            const token = jwt.sign({userId:registeredUser._id},process.env.jwtKey)
            return res.status(200).json({ currentUser: registeredUser ,token });
        } // If no user is found, attempt to find an admin 
        const registeredAdmin = await admin.findOne({ email, password });
        if (registeredAdmin) {
            return res.status(200).json({ currentAdmin: registeredAdmin });
        } // If neither user nor admin is found
        return res.status(400).json("Invalid Username or Password");
    }
    catch (err) {
        return res.status(500).json(err);
    }

}

// exports.editUserProfileAPI = async(req,res)=>{
//     console.log("inside the edit profile api");
//     const{age,place,username,email} = req.body
//     const {id} = req.params
//     try{
//         const editProfile = await users.findByIdAndUpdate({_id:id},
//             {
//                 age:age,
//                 place:place
//             }
//         )
//         await new editProfile.save()
//     }
//     catch(err){
//         res.status(406).json(err)
//     }
    
// }


exports.getAllUserRegistrationAPI=async(req,res)=>{
    console.log("Inside the All user register Api");
    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    }
    catch(err){
        res.status(400).json(err)
    }
}

