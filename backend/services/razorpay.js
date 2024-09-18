require('dotenv').config({ path: './env/.env' });
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET 
});

const createOrder = async (amount) => {
  try {
    if (amount < 100) { 
      throw new Error('Order amount less than minimum amount allowed');
    }

    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
    });

    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrder
};
