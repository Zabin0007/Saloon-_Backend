const express = require('express')
const router = express.Router()
const userController = require("../Controllers/userController")
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const bookingController = require("../Controllers/bookingController")
const feedbackController = require("../Controllers/feedbackController")
const multerMiddleware = require('../Middleware/multermiddleware')
const productController = require("../Controllers/productController")
const paymentController  =require('../Controllers/paymentController')
//registerAPI
router.post('/register',userController.registerAPI)

//loginAPI
router.post('/login',userController.loginAPI)

//getUserApi
router.get('/dashboard/allUser/',userController.getAllUserRegistrationAPI)

//bokking api
router.post('/booking',jwtMiddleware,bookingController.bookingApi)

//getAllBookingsAPI
router.get("/allBookingDetails",bookingController.AllBookingDetailsAPI)

//getbooking details of single user
router.get("/userBookingDetails",jwtMiddleware,bookingController.UserBookingDetailsAPI)

//edit booking API
router.put('/editedSlot/:bookingId',jwtMiddleware,bookingController.editBookingAPI)

//delete booking api
router.delete("/deleteSlots/:bookingId",jwtMiddleware,bookingController.deletebookingAPI)

//fedback Api
router.post('/feedback',jwtMiddleware,feedbackController.feedBackAPI)

//get feedback api
router.get('/getFeedback',feedbackController.getFeedback)

//addProduct api
router.post("/products",multerMiddleware.single('productImg'),productController.addProductAPI)

//viewProducts Api
router.get("/viewProducts",productController.getProductsAPI)

//edit products api
router.put('/editProduct/:productId',multerMiddleware.single('productImg'),productController.editProductApi)

//delete products api
router.delete("/deleteproducts/:productId",productController.deleteProductApi)

router.post('/payment',paymentController.createOrder)

router.post('/payment/verify',paymentController.verifyPayment)

router.get('/payments',paymentController.getallPayments)

module.exports=router