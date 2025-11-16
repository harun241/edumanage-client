import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import EduManage from "../Edumanage";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16">

        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <EduManage />
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300">
            <FaEnvelope /> harun01.dev@gmail.com
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 mt-1">
            <FaPhoneAlt /> +880 1820903961
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 mt-1">
            <FaMapMarkerAlt /> Dhaka, Bangladesh
          </p>
        </div>

        {/* About Section */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2">About EduManage</h4>
          <p className="text-sm text-gray-400">
            A complete solution for institutions to manage courses, classes, teachers, and students with ease.
          </p>
        </div>

        {/* Social Links */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-5 text-xl">
            <a href="https://github.com/harun241" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub />
            </a>
            <a href="https://www.facebook.com/hsharun.harun" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="https://686032d0511d55926a514217--fascinating-faun-4de390.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4 w-full">
        © {new Date().getFullYear()} EduManage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
