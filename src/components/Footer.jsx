import { Facebook, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import config from '../utils/config';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Opening Hours */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">OPENING HOURS</h3>
            <p className="text-amber-300 text-lg font-semibold">{config.openingHours}</p>
            <p className="mt-2">Happily Serving You Everyday!!</p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">CONTACT US</h3>
            <div className="space-y-2">
              <p>{config.contact.address}</p>
              {config.contact.email && <p>{config.contact.email}</p>}
              {config.contact.phone && (
                <p className="flex items-center justify-center md:justify-start">
                  <FaWhatsapp className="mr-2 h-5 w-5 text-amber-300" />
                  <a href={`https://wa.me/${config.contact.phone.replace(/\s+/g, '')}`} className="hover:text-amber-300" target="_blank" rel="noopener noreferrer">
                    {config.contact.phone}
                  </a>
                </p>
              )}
            </div>
            {/* Map Embed */}
            <div className="mt-8">
              <iframe
                src={config.mapUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">FOLLOW US</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {config.social.facebook && (
                <a href={config.social.facebook} className="text-2xl hover:text-amber-300 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {config.social.instagram && (
                <a href={config.social.instagram} className="text-2xl hover:text-amber-300 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright and Powered By */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>@{new Date().getFullYear()} {config.footerText}</p>
          <p className="mt-1 text-sm opacity-60">Powered by {config.poweredBy}</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
