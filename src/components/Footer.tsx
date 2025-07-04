
import React from 'react';
import { Calculator } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <span className="text-white font-bold text-xl">ACFT Calculator</span>
            </div>
            <p className="text-slate-400 max-w-md">
              Your reliable tool for calculating Army Combat Fitness Test scores. 
              Updated with the latest 2025 standards and scoring guidelines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#calculator" className="text-slate-400 hover:text-white transition-colors">
                  Calculator
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-white transition-colors">
                  About ACFT
                </a>
              </li>
              <li>
                <a href="#training" className="text-slate-400 hover:text-white transition-colors">
                  Training Tips
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  ACFT Standards
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Training Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Official Army Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              © 2025 ACFT Calculator by <a href="https://clangity.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">Clangity.com</a>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
