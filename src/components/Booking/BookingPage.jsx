
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceTitle = searchParams.get('service') || 'Service Booking';
  const servicePrice = searchParams.get('price') || 'Contact for pricing';
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today.setHours(0, 0, 0, 0);
      const isSelected = selectedDate === date.toISOString().split('T')[0];
      
      days.push({
        date,
        isCurrentMonth,
        isPast,
        isSelected,
        dateString: date.toISOString().split('T')[0]
      });
    }
    
    return days;
  };

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    setSelectedTime(''); // Reset time when new date is selected
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !customerInfo.name || !customerInfo.email) {
      alert('Please fill in all required fields and select a date and time.');
      return;
    }
    
    // Here you would integrate with your booking system
    alert(`Booking confirmed for ${serviceTitle} on ${selectedDate} at ${selectedTime}`);
    navigate('/');
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col items-center text-center">
              <button
                onClick={() => navigate(-1)}
                className="text-ss_purple hover:text-ss_pale_purple transition-colors flex items-center gap-2 mb-4"
              >
                ← Back
              </button>
              <h1 className="text-3xl font-bold text-ss_purple">Book Your Service</h1>
              <p className="text-gray-600 mt-1">Schedule your appointment with Stay Sharp</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Info */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h2 className="text-2xl font-bold text-ss_purple mb-4">{serviceTitle}</h2>
            <p className="text-gray-600 mb-4">{servicePrice}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What to expect:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Professional service by expert craftsmen</li>
                  <li>• High-quality results guaranteed</li>
                  <li>• Quick turnaround time</li>
                  <li>• Competitive pricing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Service Details:</h3>
                <p className="text-gray-600">
                  Our expert team will provide top-quality service using professional-grade equipment and techniques.
                  All work is guaranteed and completed with attention to detail.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h3>
            
            {/* Calendar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 text-ss_purple hover:bg-gray-100 rounded"
                >
                  ←
                </button>
                <h4 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                <button
                  onClick={handleNextMonth}
                  className="p-2 text-ss_purple hover:bg-gray-100 rounded"
                >
                  →
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => (
                  <button
                    key={index}
                    onClick={() => !day.isPast && day.isCurrentMonth && handleDateSelect(day.dateString)}
                    disabled={day.isPast || !day.isCurrentMonth}
                    className={`
                      p-2 text-sm rounded transition-colors
                      ${day.isCurrentMonth 
                        ? day.isPast 
                          ? 'text-gray-300 cursor-not-allowed'
                          : day.isSelected
                            ? 'bg-ss_purple text-white'
                            : 'text-gray-900 hover:bg-ss_purple hover:text-white'
                        : 'text-gray-300 cursor-not-allowed'
                      }
                    `}
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Available Times</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        p-2 text-sm rounded border transition-colors
                        ${selectedTime === time
                          ? 'bg-ss_purple text-white border-ss_purple'
                          : 'bg-white text-gray-900 border-gray-300 hover:border-ss_purple'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Information */}
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple focus:ring-2 focus:ring-ss_purple focus:ring-opacity-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple focus:ring-2 focus:ring-ss_purple focus:ring-opacity-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple focus:ring-2 focus:ring-ss_purple focus:ring-opacity-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requests or details about your knives..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ss_purple focus:ring-2 focus:ring-ss_purple focus:ring-opacity-20"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ss_purple text-white py-3 px-4 rounded-md hover:bg-ss_pale_purple transition-colors font-medium"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
