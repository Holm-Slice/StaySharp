
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function BookingPage() {
  const location = useLocation();
  const service = location.state?.service || {
    title: "Service Booking",
    description: "Book your service",
    price: "Contact for pricing"
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: service.title,
    message: ''
  });

  // Available services
  const services = [
    { title: "Knife Sharpening", description: "Professional blade sharpening service", price: "$5-15 per knife" },
    { title: "Tool Restoration", description: "Restore and sharpen your tools", price: "$10-25 per tool" },
    { title: "Scissor Sharpening", description: "Precision scissor sharpening", price: "$8-12 per pair" },
    { title: "Chainsaw Sharpening", description: "Professional chainsaw chain sharpening", price: "$15-20 per chain" }
  ];

  // Available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  // Mock availability data (in real app, this would come from backend)
  const getAvailability = (date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return []; // No availability on weekends
    
    // Random availability for demo
    const availableSlots = timeSlots.filter(() => Math.random() > 0.3);
    return availableSlots;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date) => {
    const availability = getAvailability(date);
    if (availability.length > 0) {
      setSelectedDate(date);
      setSelectedTime(null);
      setShowServiceSelection(false);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowServiceSelection(true);
  };

  const handleServiceSelect = (selectedService) => {
    setFormData(prev => ({
      ...prev,
      serviceType: selectedService.title
    }));
    setShowServiceSelection(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      date: selectedDate?.toLocaleDateString(),
      time: selectedTime
    };
    console.log('Booking submitted:', bookingData);
    alert('Booking request submitted! We will contact you soon.');
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back to Services Link */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="text-ss_purple hover:underline font-medium"
          >
            ← Back to Services
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white border-2 border-ss_purple p-6 mb-8 shadow-[8px_8px_0px_#453393]">
          <h1 className="font-title font-bold text-2xl md:text-3xl text-center mb-4">
            Schedule Your Service
          </h1>
          <p className="text-lg text-gray-500 font-light text-center">
            Select a date and time for your appointment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="bg-ss_purple text-white px-4 py-2 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple"
              >
                ‹
              </button>
              <h2 className="font-title font-bold text-xl">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="bg-ss_purple text-white px-4 py-2 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple"
              >
                ›
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-12"></div>;
                }

                const availability = getAvailability(date);
                const isAvailable = availability.length > 0;
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                const isPast = date < new Date().setHours(0, 0, 0, 0);

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    disabled={!isAvailable || isPast}
                    className={`h-12 border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-ss_purple text-white border-ss_purple'
                        : isAvailable && !isPast
                        ? 'bg-white border-ss_purple hover:bg-ss_purple hover:text-white cursor-pointer'
                        : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-sm">{date.getDate()}</div>
                    {isAvailable && !isPast && (
                      <div className="text-xs">{availability.length}</div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-4">
                  Available Times for {selectedDate.toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {getAvailability(selectedDate).map(time => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`py-2 px-3 border-2 transition-colors duration-[1300ms] ${
                        selectedTime === time
                          ? 'bg-ss_purple text-white border-ss_purple'
                          : 'bg-white text-ss_purple border-ss_purple hover:bg-ss_purple hover:text-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Service Selection & Booking Form */}
          <div className="space-y-6">
            {/* Service Selection */}
            {showServiceSelection && (
              <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
                <h3 className="font-title font-bold text-xl mb-4">Select Your Service</h3>
                <div className="grid gap-4">
                  {services.map(serviceOption => (
                    <div
                      key={serviceOption.title}
                      onClick={() => handleServiceSelect(serviceOption)}
                      className={`p-4 border-2 cursor-pointer transition-all duration-300 hover:shadow-[4px_4px_0px_#453393] ${
                        formData.serviceType === serviceOption.title
                          ? 'border-ss_purple bg-ss_purple text-white'
                          : 'border-ss_purple bg-white hover:bg-ss_purple hover:text-white'
                      }`}
                    >
                      <h4 className="font-bold">{serviceOption.title}</h4>
                      <p className="text-sm opacity-90">{serviceOption.description}</p>
                      <p className="text-sm font-medium mt-1">{serviceOption.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Summary & Form */}
            {selectedDate && selectedTime && formData.serviceType && (
              <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
                <h3 className="font-title font-bold text-xl mb-4">Booking Details</h3>
                
                {/* Summary */}
                <div className="bg-gray-50 p-4 mb-6 border-2 border-gray-200">
                  <p><strong>Service:</strong> {formData.serviceType}</p>
                  <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your knives, any special requirements, or questions..."
                      className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors resize-vertical"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ss_purple text-white uppercase py-3 px-6 text-lg font-medium hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
