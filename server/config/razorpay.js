const Razorpay = require("razorpay");
require("dotenv").config(); // At the very top of the file


exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});