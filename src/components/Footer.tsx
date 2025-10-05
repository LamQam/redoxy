import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Map Section */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-gray-700">Our Location</h4>
            <div className="rounded-xl overflow-hidden border-2 border-gray-700/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d871.6908273478308!2d49.6450885295625!3d26.99769652175236!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3e35a10027006fa5%3A0x1e322a903376d5b8!2zUkVET1hZLSBJbm5vdmF0aXZlIFRlY2huaWNhbCBDb250cmFjdGluZyBDb21wYW55KElUQ0MpIDY5MjUg2LTYp9ix2Lkg2KfZhNij2YXZitixINmF2K3ZhdivINio2YYg2YHZh9ivINio2YYg2LnYqNiv2KfZhNi52LLZitiyLCDYrdmKINin2YTZhdix2YLYp9ioIEVOQUQzMjc12IwgMzI3NSBBbCBKdWJhaWwgMzU1MTTigK0!3m2!1d26.9974575!2d49.645382!5e0!3m2!1sen!2sae!4v1759670689331!5m2!1sen!2sae"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="REDOXY Office Location"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:pl-8">
            <h3 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-gray-700">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <MapPin size={18} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-medium text-sm">Our Address</h4>
                  <p className="text-gray-300 text-sm mt-1">Jubail Industrial City, Eastern Province, Saudi Arabia</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Phone size={18} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-medium text-sm">Phone</h4>
                  <p className="text-gray-300 text-sm mt-1">+966 53 378 6083</p>
                  <p className="text-gray-300 text-sm">+966 56 130 7242</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={18} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-blue-300 font-medium text-sm">Email</h4>
                  <a href="mailto:info@redoxyksa.com" className="text-gray-300 text-sm mt-1 hover:text-white transition-colors">
                    info@redoxyksa.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {currentYear} REDOXY. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition">Certifications</a>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">
            ISO 9001:2015 | ISO 14001:2015 | OHSAS 18001:2007 Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
