import { Facebook, Instagram, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Opening Hours */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">OPENING HOURS</h3>
            <p className="text-amber-300 text-lg font-semibold">10:30 AM - 11:30 PM</p>
            <p className="mt-2">Happily Serving You Everyday!!</p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
            <div className="space-y-2">
              <p>info@apnasweets.com</p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone className="mr-2 h-5 w-5 text-amber-300" />
                <a href="tel:+919424900099" className="hover:text-amber-300">
                  +91 9424900099
                </a>
              </p>
              <p>123 Sweet Street, Indore</p>
              <p>Madhya Pradesh 452001</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">FOLLOW US</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-2xl hover:text-amber-300 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-2xl hover:text-amber-300 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p> {new Date().getFullYear()} Apna Sweets. All rights reserved.</p>
          <p className="text-sm mt-2">License Number: 11423850000765</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
