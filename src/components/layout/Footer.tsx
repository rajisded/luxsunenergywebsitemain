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
            <a href="https://www.facebook.com/Luxsunindiacoreteam" target="_blank" rel="noopener noreferrer">FB</a>
            <a href="https://www.instagram.com/luxsun.energy/" target="_blank" rel="noopener noreferrer">IG</a>
            <a href="https://x.com/luxsunenergy" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://youtube.com/@luxsunenergy7068?si=ReykajXYh_FjRgLP" target="_blank" rel="noopener noreferrer">YT</a>
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
