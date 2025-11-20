import React from "react";
import { Book, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#BA0C2F] text-white mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-6 h-6" />
              <h4 className="text-white">Cardinal Books</h4>
            </div>
            <p className="text-white/80 text-sm">
              Your premier destination for textbooks, supplies, and Ball State merchandise. Proudly serving the Cardinal community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-5 rounded-md border border-gray-600 shadow-lg" style={{
            boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
          }}>
            <h5 className="text-gray-200 mb-4 border-b border-gray-600 pb-2">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#BA0C2F]">›</span> Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#BA0C2F]">›</span> Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#BA0C2F]">›</span> Store Hours
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#BA0C2F]">›</span> Visit Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white mb-4">Contact Us</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>2000 W University Ave, Muncie, IN</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span>(765) 285-8000</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>info@cardinalbooks.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="text-white mb-4">Follow Us</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/60 text-xs mt-4">
              &copy; 2025 Cardinal Books. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}