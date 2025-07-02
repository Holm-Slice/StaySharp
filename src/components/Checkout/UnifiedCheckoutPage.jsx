
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import emailjs from '@emailjs/browser';
import { generateInvoiceNumber, generateOrderNumber, formatInvoiceData } from '../../utils/invoiceGenerator';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function UnifiedCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine checkout type and data
  const checkoutType = location.state?.type || 'service'; // 'service' or 'shop'
  const bookingData = location.state?.bookingData || {};
  const cartItems = location.state?.cartItems || [];
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  // Service-specific state
  const [currentServices, setCurrentServices] = useState(bookingData.services || []);
  
  // Shop-specific calculations
  const shopSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shopTax = shopSubtotal * 0.08;
  const shopTotal = shopSubtotal + shopTax;

  // Service-specific calculations
  const reservationFee = 10;
  const serviceEstimatedTotal = currentServices.length * 25;
  const serviceRemainingBalance = Math.max(0, serviceEstimatedTotal - reservationFee);

  // Determine what we're charging today
  const chargingToday = checkoutType === 'shop' ? shopTotal : reservationFee;

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

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (checkoutType === 'service') {
        // Handle service booking
        const invoiceNumber = generateInvoiceNumber('service');
        
        const enhancedBookingData = formatInvoiceData({
          ...bookingData,
          services: currentServices,
          reservationFee,
          serviceRemainingBalance,
          serviceEstimatedTotal,
          customerName: bookingData.name,
          customerEmail: bookingData.email,
          lastFourDigits: cardData.number.slice(-4)
        }, invoiceNumber);
        
        console.log('Service booking processed:', enhancedBookingData);
        
        // Send service confirmation emails
        try {
          await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_PAYMENT_CONFIRMATION_TEMPLATE_ID',
            {
              to_name: bookingData.name,
              to_email: bookingData.email,
              invoice_number: invoiceNumber,
              booking_date: bookingData.date,
              booking_time: bookingData.time,
              services: currentServices.map(s => s.title).join(', '),
              reservation_fee: reservationFee,
              remaining_balance: serviceRemainingBalance,
              estimated_total: serviceEstimatedTotal,
              reply_to: 'your-business@email.com'
            },
            'YOUR_PUBLIC_KEY'
          );
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
        }
        
        alert(`Service booking confirmed! Invoice #${invoiceNumber} - Remaining balance of $${serviceRemainingBalance} will be collected at service completion.`);
        navigate('/confirmation/service', { state: { bookingData: enhancedBookingData } });
        
      } else {
        // Handle shop purchase
        const invoiceNumber = generateInvoiceNumber('shop');
        const orderNumber = generateOrderNumber();
        
        const orderData = formatInvoiceData({
          items: cartItems,
          customerName: cardData.name,
          customerEmail: bookingData.email || 'customer@email.com',
          lastFourDigits: cardData.number.slice(-4),
          orderNumber,
          total: shopTotal,
          subtotal: shopSubtotal,
          tax: shopTax,
          shipping: 0
        }, invoiceNumber);
        
        console.log('Shop order processed:', orderData);
        
        alert(`Order confirmed! Invoice #${invoiceNumber} - You will receive a confirmation email shortly.`);
        navigate('/confirmation/shop', { state: { orderData } });
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if no valid data
  if (checkoutType === 'service' && !bookingData.date) {
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

  if (checkoutType === 'shop' && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393] text-center">
            <h1 className="font-title font-bold text-2xl mb-4">No Items in Cart</h1>
            <Link 
              to="/shop" 
              className="bg-ss_purple text-white px-6 py-3 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple"
            >
              Continue Shopping
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
            to={checkoutType === 'service' ? '/booking' : '/shop'} 
            className="text-ss_purple hover:underline font-medium"
          >
            ← Back to {checkoutType === 'service' ? 'Booking' : 'Shop'}
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white border-2 border-ss_purple p-6 mb-8 shadow-[8px_8px_0px_#453393]">
          <h1 className="font-title font-bold text-2xl md:text-3xl text-center mb-4">
            Complete Your {checkoutType === 'service' ? 'Service Booking' : 'Order'}
          </h1>
          <p className="text-lg text-gray-500 font-light text-center">
            Secure checkout powered by Stripe
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order/Booking Summary */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-6">
              {checkoutType === 'service' ? 'Booking Summary' : 'Order Summary'}
            </h2>
            
            {checkoutType === 'service' ? (
              <>
                {/* Service booking details */}
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
                </div>

                <div className="border-t-2 border-ss_purple pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estimated Total:</span>
                    <span className="font-medium">${serviceEstimatedTotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span className="font-medium">Reservation Fee (Today):</span>
                    <span className="font-medium">$10</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="font-medium">Remaining Balance:</span>
                    <span className="font-medium">${serviceRemainingBalance}</span>
                  </div>
                  <div className="border-t-2 border-ss_purple pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Charging Today:</span>
                      <span className="text-xl font-bold text-ss_purple">${reservationFee}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Shop order details */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-b-0">
                      <img 
                        src={item.image || '/assets/Images/chef-knife1.jpg'} 
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-ss_purple pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-medium">${shopSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tax:</span>
                    <span className="font-medium">${shopTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Shipping:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="border-t-2 border-ss_purple pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-xl font-bold text-ss_purple">${shopTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Payment Form */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-2">Payment Details</h2>
            <p className="text-sm text-gray-600 mb-6">
              {checkoutType === 'service' 
                ? `Today you will be paying a $10 deposit. The remaining balance of $${serviceRemainingBalance} will be collected at service completion.`
                : `Complete your purchase for $${shopTotal.toFixed(2)}.`
              }
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
                disabled={loading || (checkoutType === 'service' && currentServices.length === 0) || (checkoutType === 'shop' && cartItems.length === 0)}
                className={`w-full uppercase py-3 px-6 text-lg font-medium transition-colors duration-[1300ms] border-4 border-ss_purple ${
                  loading || (checkoutType === 'service' && currentServices.length === 0) || (checkoutType === 'shop' && cartItems.length === 0)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-ss_purple text-white hover:bg-white hover:text-ss_purple'
                }`}
              >
                {loading 
                  ? 'Processing Payment...' 
                  : checkoutType === 'service' 
                    ? (currentServices.length === 0 ? 'No Services Selected' : `Pay $${reservationFee} Reservation Fee`)
                    : (cartItems.length === 0 ? 'No Items in Cart' : `Pay $${shopTotal.toFixed(2)}`)
                }
              </button>
            </form>

            {/* Terms */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By completing this payment, you agree to our terms of service and privacy policy.
              {checkoutType === 'service' && ' The $10 reservation fee will be deducted from your final service total.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnifiedCheckoutPage;
