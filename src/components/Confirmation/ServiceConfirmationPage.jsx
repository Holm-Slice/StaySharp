
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ServiceConfirmationPage() {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};

  if (!bookingData.date) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393] text-center">
            <h1 className="font-title font-bold text-2xl mb-4">No Booking Data Found</h1>
            <Link 
              to="/" 
              className="bg-ss_purple text-white px-6 py-3 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const reservationFee = 10;
  const estimatedTotal = bookingData.services?.length * 25 || 0;
  const remainingBalance = Math.max(0, estimatedTotal - reservationFee);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white border-2 border-green-500 p-6 mb-8 shadow-[8px_8px_0px_#22c55e] text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="font-title font-bold text-2xl md:text-3xl text-green-600 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your service appointment has been successfully scheduled
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-6 text-ss_purple">Appointment Details</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Date:</span>
                <span className="font-semibold">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Time:</span>
                <span className="font-semibold">{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Customer:</span>
                <span className="font-semibold">{bookingData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="font-semibold">{bookingData.email}</span>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-4">
              <h3 className="font-bold text-lg mb-3 text-ss_purple">Services Booked:</h3>
              <div className="space-y-2">
                {bookingData.services?.map((service, index) => (
                  <div key={index} className="p-3 border-2 border-gray-200 bg-gray-50">
                    <h4 className="font-medium">{service.title}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <h2 className="font-title font-bold text-xl mb-6 text-ss_purple">Payment Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Estimated Total:</span>
                <span className="font-medium">${estimatedTotal}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="font-medium">Paid Today (Reservation):</span>
                <span className="font-medium">$10</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span className="font-medium">Remaining Balance:</span>
                <span className="font-medium">${remainingBalance}</span>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-4 mb-6">
              <h3 className="font-bold text-blue-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• The remaining balance of ${remainingBalance} will be collected at service completion</li>
                <li>• We'll contact you 24 hours before your appointment</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                to="/"
                className="w-full bg-ss_purple text-white py-3 px-6 text-center block uppercase font-medium transition-colors duration-[1300ms] border-2 border-ss_purple hover:bg-white hover:text-ss_purple"
              >
                Return Home
              </Link>
              <Link
                to="/booking"
                className="w-full bg-white text-ss_purple py-3 px-6 text-center block uppercase font-medium transition-colors duration-[1300ms] border-2 border-ss_purple hover:bg-ss_purple hover:text-white"
              >
                Book Another Service
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border-2 border-ss_purple p-6 mt-8 shadow-[8px_8px_0px_#453393] text-center">
          <h3 className="font-bold text-lg mb-3 text-ss_purple">Need to Make Changes?</h3>
          <p className="text-gray-600 mb-4">
            If you need to reschedule or have any questions, please contact us:
          </p>
          <div className="flex justify-center space-x-8">
            <div>
              <span className="font-medium">Phone:</span>
              <span className="ml-2">(555) 123-4567</span>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <span className="ml-2">info@staysharp.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceConfirmationPage;
