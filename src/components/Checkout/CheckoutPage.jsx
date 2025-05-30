
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import emailjs from '@emailjs/browser';

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

  const [currentServices, setCurrentServices] = useState(bookingData.services || []);
  
  const reservationFee = 10;
  const estimatedTotal = currentServices.length * 25; // Recalculate based on current services
  const remainingBalance = Math.max(0, estimatedTotal - reservationFee);

  const handleRemoveService = (serviceTitle) => {
    if (currentServices.length > 1) {
      setCurrentServices(currentServices.filter(s => s.title !== serviceTitle));
    }
  };

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
      console.log('Payment processed:', { ...bookingData, services: currentServices, cardData, reservationFee, remainingBalance });
      
      // Send payment confirmation email to customer
      try {
        await emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_PAYMENT_CONFIRMATION_TEMPLATE_ID', // Replace with your payment confirmation template ID
          {
            to_name: bookingData.name,
            to_email: bookingData.email,
            booking_date: bookingData.date,
            booking_time: bookingData.time,
            services: currentServices.map(s => s.title).join(', '),
            reservation_fee: reservationFee,
            remaining_balance: remainingBalance,
            estimated_total: estimatedTotal,
            reply_to: 'your-business@email.com' // Replace with your business email
          },
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );

        // Send notification to business owner
        await emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_BOOKING_NOTIFICATION_TEMPLATE_ID', // Replace with your booking notification template ID
          {
            customer_name: bookingData.name,
            customer_email: bookingData.email,
            customer_phone: bookingData.phone || 'Not provided',
            booking_date: bookingData.date,
            booking_time: bookingData.time,
            services: currentServices.map(s => s.title).join(', '),
            customer_message: bookingData.message || 'No additional details',
            reservation_fee: reservationFee,
            remaining_balance: remainingBalance,
            to_email: 'your-business@email.com' // Replace with your business email
          },
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't block the user flow if email fails
      }
      
      alert(`Payment successful! Your booking has been confirmed. Remaining balance of $${remainingBalance} will be collected at service completion.`);
      navigate('/confirmation/service', { state: { bookingData: { ...bookingData, services: currentServices } } });
      
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
              {currentServices.length === 0 ? (
                <div className="p-4 border-2 border-red-200 bg-red-50 text-red-700 text-center">
                  <p className="font-medium">No services selected</p>
                  <p className="text-sm">Please return to booking to add services</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border-2 border-gray-200 bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">$25</span>
                      {currentServices.length > 1 && (
                        <button
                          onClick={() => handleRemoveService(service.title)}
                          className="text-red-500 hover:text-red-700 px-2 py-1 border border-red-300 hover:border-red-500 transition-colors"
                          title="Remove service"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t-2 border-ss_purple pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Total:</span>
                <span className="font-medium">${estimatedTotal}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span className="font-medium">Reservation Fee (Today):</span>
                <span className="font-medium">$10</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span className="font-medium">Remaining Balance:</span>
                <span className="font-medium">${remainingBalance}</span>
              </div>
              <div className="border-t-2 border-ss_purple pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Charging Today:</span>
                  <span className="text-xl font-bold text-ss_purple">$10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-2">Payment Details</h2>
            <p className="text-sm text-gray-600 mb-6">
              Today you will be paying a $10 deposit, that will be taken off of your final bill. The remaining balance of ${remainingBalance} will be collected at the time of service completion.
            </p>
            
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
                disabled={loading || currentServices.length === 0}
                className={`w-full uppercase py-3 px-6 text-lg font-medium transition-colors duration-[1300ms] border-4 border-ss_purple ${
                  loading || currentServices.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-ss_purple text-white hover:bg-white hover:text-ss_purple'
                }`}
              >
                {loading ? 'Processing Payment...' : currentServices.length === 0 ? 'No Services Selected' : `Pay $10 Reservation Fee`}
              </button>
            </form>

            {/* Terms */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By completing this payment, you agree to our terms of service and privacy policy. 
              The $10 reservation fee will be deducted from your final service total.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
