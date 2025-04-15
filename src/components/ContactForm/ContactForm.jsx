import React, { useState } from "react";
import emailjs from "emailjs-com";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    // Clear form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div
      id="contact"
      className="flex flex-col justify-center items-center p-4 m-4 md:p-8 md:m-8 overflow-hidden"
    >
      <main className="bg-white border-2 border-ss_purple w-2/3 max-w-2/3 p-4 md:p-8 shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 overflow-hidden">
        <h1 className="font-title font-bold text-2xl md:text-3xl text-center mb-6 text-ss_purple">
          Let's Connect
        </h1>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:shadow-[0_0_10px_#453393] focus:border-ss_purple focus:ring-ss_purple focus:outline-none sm:text-sm h-11 pl-2"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:shadow-[0_0_10px_#453393] focus:border-ss_purple focus:ring-ss_purple focus:outline-none sm:text-sm h-11 pl-2"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:shadow-[0_0_10px_#453393] focus:border-ss_purple focus:ring-ss_purple focus:outline-none sm:text-sm h-11 pl-2"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:shadow-[0_0_10px_#453393] focus:border-ss_purple focus:ring-ss_purple focus:outline-none sm:text-sm h-24 pl-2 pt-2"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-ss_purple text-white uppercase py-2 px-4 md:py-3 md:px-6 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ContactForm;
