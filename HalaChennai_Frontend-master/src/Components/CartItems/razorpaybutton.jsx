import React,{useContext} from 'react';
import { useUser } from '../../Context/Usercontext'; // Import UserContext
import { ShopContext } from "../../Context/ShopContext";// Import ShopContext

const RazorpayButton = (props) => {
  const { user } = useUser(); 
  const { amount } = props;
  const { cartItems, clearCart, getTotalCartAmount,getTotalCartItems } = useContext(ShopContext);// Access cart items and clearCart function from ShopContext

  const handlePayment = async () => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
    
      console.log('User Info:', {
        name: user.displayName || 'N/A',
        email: user.email || 'N/A',
        phoneNumber: user.phone_number || 'N/A',
      });

      const response = await fetch('http://localhost:5000/api/razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: getTotalCartAmount() * 100, // Convert to paise using total cart amount
          useruid: user.uid 
        })
      });

      const data = await response.json();

      // Log the order ID received from the server
      console.log('Order ID:', data.phone_number);

      // Initialize Razorpay checkout
      const options = {
        key: 'rzp_test_cpMZ5WyKsUNW88', // Your Razorpay Test Key ID
        amount: getTotalCartAmount(),
        currency: 'INR',
        name: 'Your App Name',
        description: 'Test Transaction',
        order_id: data.id,
        handler: async function (response) {
          // Handle payment success
          console.log('Payment Success:', response);

          // Send cart details and user UID to the backend
          try {
            const backendResponse = await fetch('http://localhost:5000/api/process-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                useruid: user.uid,
                cartItems: getTotalCartItems(),
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              }),
            });

            const backendData = await backendResponse.json();
            if (backendData.success) {
              // Clear the cart on successful response
              
              console.log('Cart cleared successfully after order processing.');
            } else {
              console.error('Error processing order on backend:', backendData.message);
              alert('Error processing order on backend. Please try again.');
            }
          } catch (error) {
            console.error('Error sending order details to backend:', error);
            alert('Error sending order details to backend. Please try again.');
          }
        },
        prefill: {
          name: user.displayName || '',
          email: user.email || '',
          contact: data.phone_number || '123', // Fetch user phone number if available
        },
        // Handle payment failure
        modal: {
          ondismiss: function () {
            alert('Payment process was cancelled.');
          },
        },
      };

      // Handle payment failure
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error);
        alert('Payment failed. Please try again.');
      });

      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment. Please try again.');
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
