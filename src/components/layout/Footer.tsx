import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerTop}`}>
        <h2>M/S LUXSUN ENERGY INDIA PRIVATE LIMITED</h2>
        <p>Energizing a sustainable future. India&apos;s most iconic renewable energy brand.</p>
      </div>

      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerCol}>
          <div className={styles.infoItem}>
            <MapPin className={styles.infoIcon} size={24} />
            <div className={styles.infoText}>
              <strong>Our Offices</strong>
              <span>SATNA | REWA | BHOPAL | CHHATARPUR</span>
              <br />
              <span>C/O Savitri Gautam, Umari, Raghurajnagar Block, Umari Road, Satna City, Satna District, Madhya Pradesh, PIN 485001</span>
              <br /><br />
              <span>Bansal One 5th Floor - Fi003 Rani kamlapati railway station Bhopal, Bhopal - 462016, Madhya Pradesh, India.</span>
            </div>
          </div>
        </div>

        <div className={styles.footerCol}>
          <div className={styles.infoItem}>
            <Phone className={styles.infoIcon} size={24} />
            <div className={styles.infoText}>
              <strong>Phone Call</strong>
              <span>+91 9311110853</span>
            </div>
          </div>
          <div className={styles.infoItem} style={{ marginTop: "1.5rem" }}>
            <Mail className={styles.infoIcon} size={24} />
            <div className={styles.infoText}>
              <strong>Email Address</strong>
              <a href="mailto:luxsunenergy@gmail.com">luxsunenergy@gmail.com</a>
            </div>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>Company Links</h3>
          <ul className={styles.linksList}>
            <li><Link href="#about">About Us</Link></li>
            <li><Link href="#products">Our Products</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="#quote">Get a Quote</Link></li>
          </ul>

          <h3 style={{ marginTop: "2.5rem" }}>Social Channels</h3>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/Luxsunindiacoreteam" target="_blank" rel="noopener noreferrer">FB</a>
            <a href="https://www.instagram.com/luxsun.energy/" target="_blank" rel="noopener noreferrer">IG</a>
            <a href="https://x.com/luxsunenergy" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://youtube.com/@luxsunenergy7068?si=ReykajXYh_FjRgLP" target="_blank" rel="noopener noreferrer">YT</a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContent}`}>
          <p>&copy; {new Date().getFullYear()} M/S LUXSUN ENERGY INDIA PRIVATE LIMITED. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
