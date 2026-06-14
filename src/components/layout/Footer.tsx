"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-10 px-6 border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Luxsun Energy" className="h-8 w-auto" />
          </div>
          <p className="text-xs text-gray-500 font-light max-w-sm leading-relaxed">
            &copy; {currentYear} M/S Luxsun Energy India Pvt. Ltd. All rights reserved.
          </p>
        </div>

        {/* Center: Contact Info */}
        <div className="flex flex-col sm:flex-row gap-6 text-xs font-light text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-brand-accent shrink-0" />
            <span>SATNA | REWA | BHOPAL | CHHATARPUR</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-brand-accent shrink-0" />
            <a href="tel:+919311110853" className="hover:text-white transition-colors">+91 9311110853</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-brand-accent shrink-0" />
            <a href="mailto:luxsunenergy@gmail.com" className="hover:text-white transition-colors">luxsunenergy@gmail.com</a>
          </div>
        </div>

        {/* Right: Social & Legal */}
        <div className="flex items-center gap-6 text-xs">
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
          
          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            <a href="https://www.facebook.com/Luxsunindiacoreteam" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">FB</a>
            <a href="https://www.instagram.com/luxsun.energy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IG</a>
            <a href="https://x.com/luxsunenergy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
