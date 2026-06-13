"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Ambient gradient orbs */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />
      <div className={styles.ambientOrb3} />

      {/* Star particles */}
      <div className={styles.stars}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={styles.textBlock}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={styles.tagline}
          >
            <Sparkles size={14} />
            <span>Desh Ka Solar — Since 2021</span>
          </motion.div>

          <h1 className={styles.headline}>
            <span className={styles.headlineMain}>LUXSUN</span>
            <span className={styles.headlineSub}>ENERGY INDIA</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={styles.description}
          >
            Pioneering sustainable energy solutions across India. We engineer
            premium solar systems for residential, commercial, and agricultural
            needs — making clean power accessible to everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className={styles.actions}
          >
            <Link href="/quote" className="btn btn-primary">
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link href="#about" className="btn btn-outline">
              Discover More
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className={styles.statsRow}
        >
          {[
            { value: "500+", label: "Installations" },
            { value: "2.5MW+", label: "Capacity" },
            { value: "5.0★", label: "Google Rating" },
            { value: "400+", label: "Happy Clients" },
          ].map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className={styles.bottomFade} />
    </section>
  );
}
