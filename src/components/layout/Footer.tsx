import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top gradient line */}
      <div className={styles.topLine} />

      <div className={`container ${styles.footerInner}`}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Luxsun Energy" className={styles.footerLogo} />
          <p className={styles.brandDesc}>
            Energizing a sustainable future. India&apos;s most iconic renewable
            energy brand, powering homes and businesses across Madhya Pradesh.
          </p>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/Luxsunindiacoreteam" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/luxsun.energy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://x.com/luxsunenergy" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.73 16h4.27L8.27 4H4z"/><path d="M20 4L4 20"/></svg>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.linksList}>
            <li><Link href="#about">About Us</Link></li>
            <li><Link href="#products">Our Solutions</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="/quote">Get a Quote</Link></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Contact</h4>
          <div className={styles.contactItem}>
            <MapPin size={16} className={styles.contactIcon} />
            <span>SATNA | REWA | BHOPAL | CHHATARPUR</span>
          </div>
          <div className={styles.contactItem}>
            <Phone size={16} className={styles.contactIcon} />
            <span>+91 9311110853</span>
          </div>
          <div className={styles.contactItem}>
            <Mail size={16} className={styles.contactIcon} />
            <a href="mailto:luxsunenergy@gmail.com">luxsunenergy@gmail.com</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>&copy; {new Date().getFullYear()} M/S Luxsun Energy India Pvt. Ltd. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
