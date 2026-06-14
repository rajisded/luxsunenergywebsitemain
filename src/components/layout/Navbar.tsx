"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Solar Panels", href: "/#solar-panels" },
    { name: "Solar Roof", href: "/#solar-roof" },
    { name: "Powerbank", href: "/#powerbank" },
    { name: "Commercial", href: "/#commercial" },
    { name: "Why Luxsun", href: "/#why-luxsun" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center">
          <img
            src="/logo.png"
            alt="Luxsun Energy"
            className={`transition-all duration-300 ${
              isScrolled ? "h-10" : "h-12"
            }`}
          />
        </Link>

        {/* Center Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center gap-2 py-2 px-6 text-xs font-semibold uppercase tracking-widest rounded-md bg-white text-black hover:bg-gray-200 transition-colors duration-300"
          >
            Get a Quote
          </Link>
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-black border-l border-white/10 p-8 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <img src="/logo.png" alt="Luxsun Energy" className="h-10" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-white hover:bg-white/10 p-2 rounded-md transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-6 w-full py-3 px-6 text-center text-xs font-semibold uppercase tracking-widest rounded-md bg-white text-black hover:bg-gray-200 transition-colors duration-300"
                >
                  Get a Quote
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
