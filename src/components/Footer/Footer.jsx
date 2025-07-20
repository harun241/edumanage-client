import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import EduManage from "../Edumanage";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 mt-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <EduManage></EduManage>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300">
            <FaEnvelope /> info@edumanage.com
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 mt-1">
            <FaPhoneAlt /> +880 1234-567890
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 mt-1">
            <FaMapMarkerAlt /> Dhaka, Bangladesh
          </p>
        </div>

        {/* Optional: Quick Links or About */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2">About EduManage</h4>
          <p className="text-sm text-gray-400">
            A complete solution for institutions to manage courses, classes, teachers, and students with ease.
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} EduManage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
