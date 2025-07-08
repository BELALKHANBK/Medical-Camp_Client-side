import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-blue-900 text-white mt-20 py-10 px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Website Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-teal-300">MedCamp</h2>
          <p className="text-sm">
            Empowering communities through accessible healthcare camps. We believe in care for all.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-teal-300">Home</a></li>
            <li><a href="/availecamp" className="hover:text-teal-300">Available Camps</a></li>
            <li><a href="/dashboard" className="hover:text-teal-300">Dashboard</a></li>
            <li><a href="/login" className="hover:text-teal-300">Join Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaEnvelope /> info@medcamp.org</li>
            <li className="flex items-center gap-2"><FaPhone /> +880-1234-567890</li>
            <li>123 Health Street, Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#"><FaFacebook className="hover:text-teal-300" /></a>
            <a href="#"><FaTwitter className="hover:text-teal-300" /></a>
            <a href="#"><FaInstagram className="hover:text-teal-300" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 border-t border-gray-600 pt-4 text-sm text-gray-300">
        &copy; {new Date().getFullYear()} MedCamp | All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
