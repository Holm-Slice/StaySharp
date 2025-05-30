
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs.js';

class EmailService {
  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(emailjsConfig.publicKey);
  }

  async sendContactForm(formData) {
    try {
      // Send email to business owner
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templates.contact,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: emailjsConfig.businessEmail
        }
      );

      // Send automated response to customer
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templates.autoResponse,
        {
          to_name: formData.name,
          to_email: formData.email,
          reply_to: emailjsConfig.businessEmail
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Contact form email error:', error);
      return { success: false, error };
    }
  }

  async sendPaymentConfirmation(bookingData, paymentData) {
    try {
      // Send payment confirmation to customer
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templates.paymentConfirmation,
        {
          to_name: bookingData.name,
          to_email: bookingData.email,
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          services: bookingData.services?.map(s => s.title).join(', '),
          reservation_fee: paymentData.reservationFee,
          remaining_balance: paymentData.remainingBalance,
          estimated_total: paymentData.estimatedTotal,
          reply_to: emailjsConfig.businessEmail
        }
      );

      // Send booking notification to business
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templates.bookingNotification,
        {
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone || 'Not provided',
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          services: bookingData.services?.map(s => s.title).join(', '),
          customer_message: bookingData.message || 'No additional details',
          reservation_fee: paymentData.reservationFee,
          remaining_balance: paymentData.remainingBalance,
          to_email: emailjsConfig.businessEmail
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Payment confirmation email error:', error);
      return { success: false, error };
    }
  }

  async sendBookingConfirmation(bookingData) {
    try {
      // Send booking confirmation without payment
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templates.bookingNotification,
        {
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone || 'Not provided',
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          services: bookingData.services?.map(s => s.title).join(', '),
          customer_message: bookingData.message || 'No additional details',
          to_email: emailjsConfig.businessEmail
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Booking confirmation email error:', error);
      return { success: false, error };
    }
  }
}

export default new EmailService();
