const express = require('express');
const router = express.Router();
const { createOrder } = require('../services/razorpay');
const { db } = require('../config/firebase');
const admin = require('firebase-admin'); 

router.post('/razorpay-order', async (req, res) => {
  try {
    const { amount, useruid } = req.body;

    console.log('User UID:', useruid);
    console.log('Amount:', amount); 


    const order = await createOrder(amount);

    //
    const userDoc = await db.collection('users').doc(useruid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    res.json({
      id: order.id,
      amount: order.amount,
      phone_number: userData.phone_number || 'N/A',
      address: userData.address || 'N/A'
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/process-order', async (req, res) => {
  try {
    const { useruid, cartItems, paymentId, orderId } = req.body;

    if (!useruid || !cartItems || !paymentId || !orderId) {
      return res.status(400).json({ success: false, message: 'Invalid request' });
    }

  
    const orderData = {
      useruid,
      cartItems,
      paymentId,
      orderId,
      status: 'success',
      createdAt: admin.firestore.Timestamp.now()
    };

    
    await db.collection('orders').doc(useruid).set(orderData);

    res.json({ success: true, message: 'Order processed and saved successfully' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ success: false, message: 'Failed to process order' });
  }
});

module.exports = router;
