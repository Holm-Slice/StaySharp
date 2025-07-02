import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedService = location.state?.service || {
    title: "Western Style Knife Sharpening",
    description: "Professional knife sharpening service",
    price: "Starting at $1 per inch"
  };

  // State hooks
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedServices, setSelectedServices] = useState([selectedService]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const modalRef = useRef(null);

  // Available services
  const availableServices = [
    { title: "Western Style Knife Sharpening", description: "Wusthof, Zwilling, Shun, and more!", price: "Starting at $1 per inch" },
    { title: "Japanese Style Knife Sharpening", description: "Shun, Global, Miyabi, and more!", price: "Starting at $2 per inch" },
    { title: "Single Bevel Knives", description: "Yanagiba, Deba, Usuba, Etc", price: "Starting at $3 per knife" },
    { title: "Chip Repair", description: "Repair of any chips in the edge", price: "Starting at $5" },
    { title: "Tip Repair", description: "Repair that tip you accidentally broke", price: "Starting at $7" },
    { title: "Bevel Repair", description: "Bread Knives, Serrated Knives, and more!", price: "Starting at $10" },
    { title: "Thinning", description: "Maintenance to keep that edge workin'", price: "Starting at $15" },
    { title: "Shears", description: "Kitchen, Hair or Pruning", price: "Starting at $20" },
    { title: "Mandolins", description: "Cut your finger off easily again", price: "Starting at $7" },
    { title: "Rehandling", description: "Replace that handle you broke", price: "Starting at $15" },
    { title: "Total Restoration", description: "Get that beast piece RTG", price: "Starting at $50" }
  ];

  // Time slots
  const timeSlots = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

  // Mock availability
  const getAvailability = (date) => {
    const dow = date.getDay();
    if (dow === 0 || dow === 6) return [];
    return timeSlots.filter(() => Math.random() > 0.3);
  };

  // Days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear(), month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
    return days;
  };

  // Memoized
  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);
  const availableTimes = useMemo(() => selectedDate ? getAvailability(selectedDate) : [], [selectedDate]);

  // Handlers
  const handleDateClick = (date) => {
    const avail = getAvailability(date);
    if (!avail.length) return;
    if (selectedDate?.toDateString() === date.toDateString()) {
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };
  const handleTimeSelect = (time) => setSelectedTime(time);
  const handleAddService = (svc) => {
    if (!selectedServices.find(s => s.title === svc.title)) setSelectedServices([...selectedServices, svc]);
    setShowServiceModal(false);
  };
  const handleRemoveService = (title) => {
    if (selectedServices.length > 1) setSelectedServices(selectedServices.filter(s => s.title !== title));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Create Stripe session & redirect
  async function createSessionAndRedirect(bookingData) {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingData }),
    });
    const { url } = await res.json();
    window.location.href = url;
  }

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      date: selectedDate?.toLocaleDateString(),
      time: selectedTime,
      services: selectedServices
    };
    await createSessionAndRedirect(bookingData);
  };

  // Focus trap
  useEffect(() => {
    if (showServiceModal && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll('button, [href], input, textarea');
      focusable[0]?.focus();
      const trap = e => { if (e.key === 'Tab') { e.preventDefault(); focusable[0]?.focus(); }};
      modalRef.current.addEventListener('keydown', trap);
      return () => modalRef.current.removeEventListener('keydown', trap);
    }
  }, [showServiceModal]);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <Link to="/" className="text-ss_purple hover:underline font-medium">← Back to Services</Link>
        </div>
        <section aria-labelledby="booking-heading" className="bg-white border-2 border-ss_purple p-6 mb-8 shadow-[8px_8px_0px_#453393]">
          <h1 id="booking-heading" className="font-title font-bold text-2xl md:text-3xl text-center mb-4">Schedule Your Service</h1>
          <p className="text-lg text-gray-500 font-light text-center">Select a date and time for your appointment</p>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
            <div className="flex justify-between items-center mb-6">
              <button aria-label="Previous month" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="bg-ss_purple text-white px-4 py-2 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple">‹</button>
              <h2 id="calendar-month" aria-live="polite" className="font-title font-bold text-xl">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
              <button aria-label="Next month" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="bg-ss_purple text-white px-4 py-2 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple">›</button>
            </div>
            <div role="rowgroup" className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => <div key={day} role="columnheader" className="text-center font-medium text-gray-600 py-2">{day}</div>)}
            </div>
            <div role="grid" aria-labelledby="calendar-month" className="grid grid-cols-7 gap-1">
              {days.map((date, idx) => {
                if (!date) return <div key={idx} className="h-12" aria-hidden="true"></div>;
                const isAvailable = getAvailability(date).length > 0;
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                const label = `${date.toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'})}, ${isAvailable?'available':'unavailable'}`;
                return (
                  <button
                    key={idx}
                    role="gridcell"
                    tabIndex={isSelected?0:-1}
                    aria-selected={isSelected}
                    aria-disabled={!isAvailable}
                    aria-label={label}
                    onClick={() => handleDateClick(date)}
                    disabled={!isAvailable}
                    className={`h-12 border-2 transition-all duration-300 flex items-center justify-center ${isSelected?'bg-ss_purple text-white border-ss_purple':isAvailable?'bg-white border-ss_purple hover:bg-ss_purple hover:text-white cursor-pointer':'bg-gray-100 border-gray-300 text-gray-400'}`}
                  >
                    <span className="text-sm">{date.getDate()}</span>
                  </button>
                );
              })}
            </div>
            {selectedDate && (
              <section aria-labelledby="timeslot-heading" className="mt-6">
                <h3 id="timeslot-heading" className="font-bold text-lg mb-4">Available Times for {selectedDate.toLocaleDateString()}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.length?availableTimes.map(time=>(
                    <button key={time} onClick={()=>handleTimeSelect(time)} className={`py-2 px-3 border-2 transition-colors duration-[1300ms] ${selectedTime===time?'bg-ss_purple text-white border-ss_purple':'bg-white text-ss_purple border-ss_purple hover:bg-ss_purple hover:text-white'}`}>{time}</button>
                  )):<p role="alert" className="text-red-500">No times available</p>}
                </div>
              </section>
            )}
          </div>

          {/* Services & Booking Form */}
          <aside className="space-y-6" aria-labelledby="booking-details">
            {selectedDate&&selectedTime&&(
              <section id="booking-details" className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-title font-bold text-xl">Your Services</h3>
                  <button onClick={()=>setShowServiceModal(true)} className="bg-ss_purple text-white px-4 py-2 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-2 border-ss_purple text-sm">+ Add Service</button>
                </div>
                <ul aria-label="Selected services" className="space-y-3">
                  {selectedServices.map((svc,i)=>(
                    <li key={i} className="flex justify-between items-center p-3 border-2 border-gray-200 bg-gray-50">
                      <div><h4 className="font-medium">{svc.title}</h4><p className="text-sm text-gray-600">{svc.price}</p></div>
                      {selectedServices.length>1&&<button aria-label={`Remove ${svc.title}`} onClick={()=>handleRemoveService(svc.title)} className="text-red-500 hover:text-red-700 px-2 py-1">✕</button>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {showServiceModal&&(
              <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="add-service-heading" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393] max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
                  <h3 id="add-service-heading" className="font-title font-bold text-xl mb-4">Add a Service</h3>
                  <button aria-label="Close dialog" onClick={()=>setShowServiceModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl absolute top-4 right-4">✕</button>
                  <ul className="grid gap-3">
                    {availableServices.filter(s=>!selectedServices.find(sel=>sel.title===s.title)).map(svc=>(
                      <li key={svc.title}>
                        <button onClick={()=>handleAddService(svc)} className="w-full text-left p-4 border-2 border-ss_purple bg-white hover:bg-ss_purple hover:text-white cursor-pointer transition-all duration-300 hover:shadow-[4px_4px_0px_#453393]">
                          <h4 className="font-bold">{svc.title}</h4>
                          <p className="text-sm opacity-90">{svc.description}</p>
                          <p className="text-sm font-medium mt-1">{svc.price}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {selectedDate&&selectedTime&&(
              <section className="bg-white border-2 border-ss_purple p-6 shadow-[8px_8px_0px_#453393]">
                <h3 className="font-title font-bold text-xl mb-4">Booking Details</h3>
                <div className="bg-gray-50 p-4 mb-6 border-2 border-gray-200">
                  <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Services:</strong> {selectedServices.length} service(s) selected</p>
                </div>
                <form onSubmit={handleSubmit} aria-labelledby="contact-form" className="space-y-4">
                  <h4 id="contact-form" className="sr-only">Your contact information</h4>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input id="name" name="name" type="text" required aria-required="true" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input id="email" name="email" type="email" required aria-required="true" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                    <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleInputChange} placeholder="Tell us about your knives, any special requirements, or questions..." className="w-full px-3 py-2 border-2 border-gray-300 focus:border-ss_purple focus:outline-none transition-colors resize-vertical" />
                  </div>
                  <button type="submit" className="w-full bg-ss_purple text-white uppercase py-3 px-6 text-lg font-medium hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple">
                    Confirm Booking
                  </button>
                </form>
              </section>
            )}
          </aside>
        </div>
      </div>
  );
}

export default BookingPage;
