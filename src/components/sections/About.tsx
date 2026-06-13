"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  const features = [
    "Expertise & Experience",
    "Customized Solutions",
    "Customer-Centric Approach",
    "Proven Track Record",
  ];

  return (
    <section className={styles.about} id="about">
      <div className={styles.bgLine} />
      <div className={`container ${styles.grid}`}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={styles.imageCol}
        >
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
              alt="Solar array installation"
              className={styles.mainImage}
            />
            <div className={styles.glowOverlay} />
          </div>
          <div className={styles.floatingCard}>
            <span className={styles.floatingValue}>300+</span>
            <span className={styles.floatingLabel}>Satisfied Clients</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={styles.textCol}
        >
          <span className="badge">About Us</span>
          <h2 className="section-title">Building India&apos;s Sustainable Future</h2>
          <p className="section-desc" style={{ margin: "0 0 1.5rem 0" }}>
            Established in 2021 by Yash Gautam, Luxsun Energy India has rapidly
            emerged as a leader in the renewable energy sector, proudly known as
            &quot;Desh Ka Solar.&quot;
          </p>
          <p className={styles.secondParagraph}>
            Our vision is to revolutionize India&apos;s energy consumption by making
            solar power accessible and affordable for every household and business.
          </p>

          <div className={styles.featureGrid}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureItem}>
                <CheckCircle2 size={18} className={styles.featureIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Link href="/quote" className="btn btn-primary" style={{ marginTop: "2rem" }}>
            Get Started <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
