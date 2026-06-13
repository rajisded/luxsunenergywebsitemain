"use client";

import { motion } from "framer-motion";
import styles from "./Stats.module.css";

const stats = [
  { id: 1, num: "400+", label: "Happy Clients" },
  { id: 2, num: "2.5MW+", label: "Installed Capacity" },
  { id: 3, num: "500+", label: "Solar Installations" },
  { id: 4, num: "1.2M+", label: "Units Generated Yearly" },
];

export default function Stats() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className={styles.statsSection}>
      <div className={`container`}>
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.statsGrid}
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={itemVars} className={styles.statItem}>
              <div className={styles.statNum}>{stat.num}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
