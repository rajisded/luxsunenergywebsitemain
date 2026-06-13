"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <img 
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80" 
          alt="Solar Panels" 
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={`container ${styles.heroContent}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.heroTextContainer}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={styles.badge}
          >
            Desh Ka Solar
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Leading the Way in <span className={styles.highlight}>Sustainable</span> Energy Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We engineer high-performance systems for residential, commercial, and agricultural needs. Clean energy is now affordable and accessible for everyone.
          </motion.p>
          
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link href="#quote" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Start Your Journey <ArrowRight size={20} />
            </Link>
            <Link href="#about" className="btn btn-outline" style={{ borderColor: 'var(--text-on-primary)', color: 'var(--text-on-primary)', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.heroStats}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className={styles.statCard}>
            <div className={styles.statValue}>5.0 ★</div>
            <div className={styles.statLabel}>Satna Google Rating</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>4.9 ★</div>
            <div className={styles.statLabel}>Rewa Google Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
