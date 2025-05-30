
// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const emailjsConfig = {
  serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  
  templates: {
    contact: 'YOUR_CONTACT_TEMPLATE_ID', // Contact form to business
    autoResponse: 'YOUR_AUTORESPONSE_TEMPLATE_ID', // Auto-response to customer
    paymentConfirmation: 'YOUR_PAYMENT_CONFIRMATION_TEMPLATE_ID', // Payment confirmation to customer
    bookingNotification: 'YOUR_BOOKING_NOTIFICATION_TEMPLATE_ID' // New booking notification to business
  },
  
  businessEmail: 'your-business@email.com' // Replace with your business email
};

// Initialize EmailJS
import emailjs from '@emailjs/browser';

// You can initialize EmailJS here if needed
// emailjs.init(emailjsConfig.publicKey);
