
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || {};
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  // Calculate total price (mock calculation for demo)
  const calculateTotal = () => {
    if (!bookingData.services) return 0;
    return bookingData.services.length * 25; // $25 base per service for demo
  };

  const total = calculateTotal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        alert('Stripe is not configured yet. Please contact the store owner.');
        setLoading(false);
        return;
      }

      // For demo purposes, simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally integrate with your Stripe backend
      console.log('Payment processed:', { bookingData, cardData, total });
      alert('Payment successful! Your booking has been confirmed.');
      navigate('/');
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData.date) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393] text-center">
            <h1 className="font-title font-bold text-2xl mb-4">No Booking Data Found</h1>
            <Link 
              to="/booking" 
              className="bg-ss_purple text-white px-6 py-3 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple"
            >
              Return to Booking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            to="/booking" 
            className="text-ss_purple hover:underline font-medium"
          >
            ← Back to Booking
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white border-2 border-ss_purple p-6 mb-8 shadow-[8px_8px_0px_#453393]">
          <h1 className="font-title font-bold text-2xl md:text-3xl text-center mb-4">
            Complete Your Payment
          </h1>
          <p className="text-lg text-gray-500 font-light text-center">
            Secure checkout powered by Stripe
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-6">Booking Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Customer:</span>
                <span>{bookingData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{bookingData.email}</span>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-4 mb-4">
              <h3 className="font-bold text-lg mb-3">Services:</h3>
              <div className="space-y-2">
                {bookingData.services?.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border-2 border-gray-200 bg-gray-50">
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <span className="font-medium">$25</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-ss_purple pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold text-ss_purple">${total}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-6">Payment Details</h2>
            
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={cardData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="number"
                      required
                      value={cardData.number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        required
                        value={cardData.expiry}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVC *
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        required
                        value={cardData.cvc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors"
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-gray-50 p-4 border-2 border-gray-200">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">🔒</span>
                  <span className="text-sm text-gray-600">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full uppercase py-3 px-6 text-lg font-medium transition-colors duration-[1300ms] border-4 border-ss_purple ${
                  loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-ss_purple text-white hover:bg-white hover:text-ss_purple'
                }`}
              >
                {loading ? 'Processing Payment...' : `Pay $${total}`}
              </button>
            </form>

            {/* Terms */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By completing this payment, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
