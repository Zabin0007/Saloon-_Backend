const RazorPay = require('razorpay')
const crypto = require("crypto");
const payment = require('../Models/paymentScemea');
// Initialize Razorpay with credentials from environment variables
const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,  // Get from Razorpay Dashboard
    key_secret: process.env.RAZORPAY_KEY_SECRET  // Get from Razorpay Dashboard
  });
  
  
  // Create Razorpay Order
  exports.createOrder = async (req, res) => {
      const { amount } = req.body; // Amount in INR, but needs to be in paise
    
      // Convert amount to paise
      const amountInPaise = amount * 100; // e.g., ₹100 = 10000 paise
    
      const options = {
        amount: amountInPaise, // Razorpay expects the amount in paise
        currency: 'INR',
        receipt: crypto.randomBytes(10).toString('hex'), // Generate a unique receipt ID
      };
    
      try {
        const order = await razorpay.orders.create(options);
        res.json({
          id: order.id,
          currency: options.currency,
          amount: options.amount,
        }); // Send the order_id back to frontend
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Error creating order');
      }
    };
exports.verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature, amount, currency } = req.body;

  // Step 1: Generate the signature from the Razorpay order_id and payment_id
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`) // Ensure the orderId and paymentId order is correct
    .digest('hex');

  console.log('Generated Signature:', generatedSignature);
  console.log('Received Signature:', signature);

  // Step 2: Verify the signature
  if (generatedSignature === signature) {
    try {
      // Save payment details in the database
      const newPayment = new payment({
        paymentId,
        orderId,
        status: 'success',
        amount, 
        currency,
      });

      await newPayment.save();
      console.log('Payment details saved:', newPayment);
      res.status(200).send('Payment successful');
    } catch (error) {
      console.error('Error while saving payment:', error);
      res.status(500).send('Internal server error while saving payment');
    }
  } else {
    console.log('Signature mismatch - Expected:', generatedSignature, 'Received:', signature);
    res.status(400).send('Payment verification failed - Signature mismatch');
  }

  // Additional logging to debug the payment data
  console.log('Received Payment Data from Frontend:');
  console.log('Order ID:', orderId);
  console.log('Payment ID:', paymentId);
  console.log('Signature:', signature);
  console.log('Amount:', amount);
  console.log('Currency:', currency);
};

exports.getallPayments=async(req,res)=>{
  console.log('inside the all payments');
  try{
      const amount = await payment.find()
      res.status(200).json(amount)
  }
  catch(err){
    res.status(406).json(err)
  }
}