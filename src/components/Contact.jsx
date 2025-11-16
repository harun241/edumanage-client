// src/pages/Contact.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Message sent successfully!"); // <-- Toast instead of alert
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className=" mt-5">
  <Link to={'/'}>
    <button className="btn bg-sky-400 hover:bg-sky-700 text-white">
      Back To Home
    </button>
  </Link>
</div>
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p>
              Have questions or feedback? We'd love to hear from you. Fill out the form or use the contact info below.
            </p>
            <div className="space-y-3">
              <p><strong>Email:</strong> support@edumanage.com</p>
              <p><strong>Phone:</strong> +880123456789</p>
              <p><strong>Address:</strong> 123 EduStreet, Dhaka, Bangladesh</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <iframe
                title="EduManage Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902753073355!2d90.41251831498328!3d23.81033159457619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b10dbfbd5f%3A0xf0b2e1d0f0b9c5d2!2sDhaka!5e0!3m2!1sen!2sbd!4v1689645678901!5m2!1sen!2sbd"
                width="100%"
                height="250"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-sky-400 text-white rounded-xl font-semibold hover:bg-sky-700 transition"
            >
              Send Message
            </button>
          </form>
        
        </div>
      </section>
      

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Contact;
