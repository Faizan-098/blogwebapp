import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-[#FFF] border-t border-gray-200 pt-12 pb-6 mt-3">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-10 text-[#444]">
        {/* Logo / About */}
        <div>
          <img src="/logo.png" alt="logo" className="w-[160px] mb-4" />
          <p className="text-[15px] leading-relaxed">
            Sharing inspiring stories, tutorials, and insights from the world of
            technology and creativity. Stay curious, keep learning, and grow
            with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">Quick Links</h3>
          <ul className="space-y-2 text-[15px]">
            {["Home", "Blogs", "About", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[#FF385C] transition-all duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">Contact</h3>
          <ul className="space-y-3 text-[15px]">
            <li className="flex items-center gap-2">
              <IoLocationOutline className="text-[#FF385C] text-lg" />
              Karachi, Pakistan
            </li>
            <li className="flex items-center gap-2">
              <IoMailOutline className="text-[#FF385C] text-lg" />
              info@myblog.com
            </li>
            <li className="flex items-center gap-2">
              <IoCallOutline className="text-[#FF385C] text-lg" />
              +92 300 1234567
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 hover:bg-[#FF385C] hover:text-white transition-all duration-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 hover:bg-[#FF385C] hover:text-white transition-all duration-200"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 hover:bg-[#FF385C] hover:text-white transition-all duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 hover:bg-[#FF385C] hover:text-white transition-all duration-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-12 border-t border-gray-200 pt-6">
        © {new Date().getFullYear()} <span className="text-[#FF385C] font-semibold">MyBlog</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
