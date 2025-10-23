import React from "react";
import logo from "./assets/home/img/Group 29.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
  {/* Top Footer */}
  <footer className="bg-dark text-cream px-4 sm:px-10 lg:px-20 py-10 w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20">
      {/* Logo + About */}
      <div>
        <Link to="/"><img src={logo} className="w-40 sm:w-52 mb-4" alt="Sweet Heart Logo" /></Link>
        <p className="text-sm leading-relaxed max-w-xs text-gray-light">
          Shop smart, live better - Cartify brings your favorite products right to your cart.
        </p>
      </div>

      {/* Useful Links */}
      <div>
        <h1 className="font-bold mb-3 text-amber">USEFUL LINKS</h1>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/aboutus" className="hover:text-mint transition">About Us</Link>
          </li>
          <li className="hover:text-mint transition">Events</li>
          <li className="hover:text-mint transition">Blogs</li>
          <li>
            <Link to="/faq" className="hover:text-mint transition">FAQs</Link>
          </li>
        </ul>
      </div>

      {/* Main Menu */}
      <div>
        <h1 className="font-bold mb-3 text-amber">MAIN MENU</h1>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/" className="hover:text-mint transition">Home</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-mint transition">Services</Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-mint transition">Menu</Link>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h1 className="font-bold mb-3 text-amber">CONTACT US</h1>
        <ul className="space-y-2 text-sm text-gray-light">
          <li>cartify@gmail.com</li>
          <li>+91 8122595789</li>
        </ul>
      </div>
    </div>
  </footer>

  {/* Bottom Bar */}
  <footer className="px-4 sm:px-10 lg:px-20 py-3 bg-slate text-cream flex flex-col sm:flex-row justify-between items-center gap-4 w-full border-t border-slate">
    <h1 className="text-sm text-center sm:text-left">
      Copyright © 2025 - All rights reserved
    </h1>
    <h1 className="text-sm italic">
      Designed & Engineered by{" "}
      <a
        href="https://www.linkedin.com/in/dhanush-murugesan-stm/"
        className="font-bold text-mint hover:text-sky transition"
      >
        Dhanush
      </a>
    </h1>
    <div className="inline-flex gap-4">
      <FaInstagram size="24" className="hover:text-mint cursor-pointer" />
      <FaLinkedin size="24" className="hover:text-mint cursor-pointer" />
      <FaFacebook size="24" className="hover:text-mint cursor-pointer" />
      <FaXTwitter size="24" className="hover:text-mint cursor-pointer" />
      <FaYoutube size="24" className="hover:text-mint cursor-pointer" />
    </div>
  </footer>
</div>
  );
};

export default Footer;