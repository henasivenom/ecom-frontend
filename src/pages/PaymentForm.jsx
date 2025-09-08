import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpay = () => {
    const options = {
      key: 'rzp_test_YourKeyHere', // Replace with your Razorpay test key
      amount: 50000, // Amount in paise (50000 = ₹500)
      currency: 'INR',
      name: 'Bookstore Payment',
      description: 'Test Transaction',
      image: 'https://dummyimage.com/100x100/000/fff.png&text=Book',
      handler: function (response) {
        // On successful payment
        navigate('/order-success');
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#2563eb',
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
        <p className="mb-6 text-gray-600">Click below to pay securely with Razorpay.</p>
        <button
          type="button"
          onClick={handleRazorpay}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition text-lg"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
