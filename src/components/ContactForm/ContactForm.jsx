// import React, { useState } from "react";
// import "./ContactForm.css";

// function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className="contact-form-container">
//       <div className="background-image"></div>
//       <form className="contact-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message">Message:</label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             maxLength="150"
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default ContactForm;

// filepath: /Users/taylorholm/Desktop/Developmental/Stay Sharp/stay-sharp-site/src/components/ContactForm/ContactForm.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      message: "",
    });
  };

  return (
    <div className="flex flex-col ">
      <div className="contact-form-container">
        <div className="flex flex-col text-wrap justify-center align-center text-ss_purple text-4xl pt-10 pb-6 text-center">
          <h1>Let's Connect</h1>
        </div>
        <div className="background-image"></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
