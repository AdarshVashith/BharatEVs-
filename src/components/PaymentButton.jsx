import React from 'react';

const PaymentButton = ({ amount, onSuccess }) => {
  const handlePayment = async () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "BHARAT EVs",
      description: "Inspection Fee Payment",
      image: "https://your-logo-url.com",
      handler: function(response) {
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      notes: {
        address: "BHARAT EVs Corporate Office"
      },
      theme: {
        color: "#4CAF50"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button 
      onClick={handlePayment}
      className="btn btn-lg"
      style={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '0.85rem 1.5rem',
        borderRadius: '8px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        width: '100%',
        marginTop: '1rem'
      }}
    >
      Pay ₹{amount} Inspection Fee
    </button>
  );
};

export default PaymentButton;