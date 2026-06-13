"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import styles from "./Navbar.module.css";

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
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "#about" },
    { name: "SOLUTIONS", href: "#products" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Gradient mask background */}
      <div className={styles.headerBg} />

      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Luxsun Energy" />
        </Link>

        <nav className={styles.desktopNav}>
          {links.map((link) => (
            <Link key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.navActions}>
          <Link href="/quote" className={styles.ctaButton}>
            Get a Quote <ArrowRight size={16} />
          </Link>
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.overlay}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={styles.mobileDrawer}
            >
              <div className={styles.drawerHeader}>
                <img src="/logo.png" alt="Luxsun Energy" className={styles.logoImage} />
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X size={28} color="#fff" />
                </button>
              </div>
              <nav className={styles.mobileLinks}>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/quote"
                  className={styles.mobileCta}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get a Quote <ArrowRight size={18} />
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
