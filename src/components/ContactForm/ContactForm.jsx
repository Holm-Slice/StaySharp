import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email to business owner
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_CONTACT_TEMPLATE_ID', // Replace with your contact form template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'your-business@email.com' // Replace with your business email
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      // Send automated response to customer
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_AUTORESPONSE_TEMPLATE_ID', // Replace with your auto-response template ID
        {
          to_name: formData.name,
          to_email: formData.email,
          reply_to: 'your-business@email.com' // Replace with your business email
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8"
    >
      <main className="bg-white border-2 border-ss_purple w-2/3 max-w-2/3 p-4 md:p-8 shadow-[8px_8px_0px_#453393] hover:transition-transform md:hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 overflow-hidden">
        <h1 className="font-title font-bold text-2xl md:text-3xl text-center mb-6 text-ss_purple">
          Let's Connect
        </h1>

        {submitStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Thank you! Your message has been sent successfully. We'll get back to you soon!
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Sorry, there was an error sending your message. Please try again or contact us directly.
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name, Email, and Phone Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-2 border-ss_purple shadow-[4px_4px_0px_#453393] focus:outline-none sm:text-sm h-11 pl-2"
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-2 border-ss_purple shadow-[4px_4px_0px_#453393] focus:outline-none sm:text-sm h-11 pl-2"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border-2 border-ss_purple shadow-[4px_4px_0px_#453393] focus:outline-none sm:text-sm h-11 pl-2"
            />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border-2 border-ss_purple shadow-[4px_4px_0px_#453393] focus:outline-none sm:text-sm h-24 pl-2 pt-2"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-ss_purple text-white uppercase py-2 px-4 md:py-3 md:px-6 transition-colors duration-[1300ms] border-4 border-ss_purple ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white hover:text-ss_purple'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </main>
       <div className="seo-text" style={{ display: 'none' }}>
        Contact Austin Texas knife sharpening service professional kitchen cutlery expert 
        knife restoration consultation Austin blade sharpening appointment kitchen knife repair 
        Austin Texas professional knife care expert knife sharpening service contact
      </div>
    </div>
  );
}

export default ContactForm;