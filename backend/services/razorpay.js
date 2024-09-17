const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_cpMZ5WyKsUNW88', // Replace with your Razorpay Test Key ID
  key_secret: '7lkEfakxLQizuzkpUQPbBuoJ' // Replace with your Razorpay Secret Key
});

const createOrder = async (amount) => {
  try {
    if (amount < 100) { // 
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
