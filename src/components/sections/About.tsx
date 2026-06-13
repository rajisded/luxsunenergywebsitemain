"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  const features = [
    "Expertise & Experience",
    "Customized Solutions",
    "Customer-Centric Approach",
    "Proven Track Record"
  ];

  return (
    <section className="section-padding" id="about">
      <div className={`container ${styles.aboutContainer}`}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={styles.aboutContent}
        >
          <span className="badge">About Us</span>
          <h2 className="section-title">Count on Us for a Sustainable Future</h2>
          <p className="section-desc" style={{ textAlign: "left", margin: "0 0 1.5rem 0" }}>
            Established in 2021 by Yash Gautam, Luxsun Energy India has rapidly emerged as a leader in the renewable energy sector, proudly known as "Desh Ka Solar."
          </p>
          <p className="section-desc" style={{ textAlign: "left", margin: "0 0 2rem 0" }}>
            Our vision is to revolutionize India's energy consumption by making solar power accessible and affordable for every household and business. Join us in our mission to power India with clean, sustainable energy.
          </p>
          
          <div className={styles.featuresList}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.featureItem}>
                <CheckCircle2 className={styles.featureIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Link href="#quote" className="btn btn-primary" style={{ marginTop: "2rem" }}>
            Discover Our Story
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={styles.imageWrapper}
        >
          <img 
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80" 
            alt="Luxsun Solar Array" 
            className={styles.mainImage}
          />
          <div className={styles.experienceBadge}>
            <strong>300+</strong>
            <span>Satisfied Clients</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
