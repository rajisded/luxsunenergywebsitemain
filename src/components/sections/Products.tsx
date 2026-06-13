"use client";

import { motion } from "framer-motion";
import { Sun, Battery, Zap, ArrowUpRight } from "lucide-react";
import styles from "./Products.module.css";

const products = [
  {
    id: "on-grid",
    title: "On-Grid Solar",
    desc: "Connected to the public utility grid. Ideal for residential households looking to reduce monthly electricity costs with net metering benefits.",
    icon: <Sun size={24} />,
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))",
    borderColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    id: "off-grid",
    title: "Off-Grid Solar",
    desc: "Operates independently with dedicated battery storage. Perfect for remote locations, farmhouses, and areas with frequent power outages.",
    icon: <Battery size={24} />,
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02))",
    borderColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: "hybrid",
    title: "Hybrid Solar",
    desc: "Combines grid connection with intelligent battery backup. Ensures uninterrupted power during blackouts while maintaining net metering savings.",
    icon: <Zap size={24} />,
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02))",
    borderColor: "rgba(16, 185, 129, 0.15)",
  },
];

export default function Products() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className={styles.section} id="products">
      <div className="container">
        <div className={styles.header}>
          <span className="badge">Our Solutions</span>
          <h2 className="section-title">Comprehensive Energy Systems</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            We deliver customized solar installations engineered for maximum
            efficiency and long-term savings across residential, commercial, and
            agricultural applications.
          </p>
        </div>

        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.grid}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVars}
              className={styles.card}
              style={{
                background: product.gradient,
                borderColor: product.borderColor,
              }}
            >
              <div className={styles.cardIcon}>{product.icon}</div>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardDesc}>{product.desc}</p>
              <div className={styles.cardLink}>
                <span>Learn More</span>
                <ArrowUpRight size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
